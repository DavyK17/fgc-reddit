import makeID from "../util/randomString";
import checkNested from "../util/checkNested";

let state = makeID(7);
let code;

const clientID = "6GyLIZKwo2Oo3s1FgtecFw";
const clientSecret = "S0JhJxxfKogUviVhk0QAg5F7iQvg3w";

const responseType = "code";
const redirectURI = "http://localhost:3000"
const authDuration = "permanent";

const Reddit = {
    async getAccessToken() {
        if (localStorage.getItem("access_token")) return localStorage.getItem("access_token");

        const stateMatch = window.location.href.match(/state=([^&]*)/);
        const codeMatch = window.location.href.match(/code=([^&]*)/);

        if (stateMatch && codeMatch) {
            state = stateMatch[1];
            code = codeMatch[1].match(/.*[^(#_)]/)[0];

            const data = new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectURI
            });
            try {
                const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
                const url = "https://www.reddit.com/api/v1/access_token";
                const headers = { Authorization: `Basic ${credentials}` };

                const response = await fetch(url, {
                    headers: headers,
                    method: "POST",
                    body: data
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    localStorage.setItem("access_token", jsonResponse.access_token);

                    let expiryTime = Number(jsonResponse.expires_in);

                    window.setTimeout(() => localStorage.setItem("access_token", ""), expiryTime * 1000);
                    window.history.pushState("Access Token", null, "/");

                    return localStorage.getItem("access_token");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const scopes = "identity vote read";
            window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${responseType}&state=${state}&redirect_uri=${encodeURIComponent(redirectURI)}&duration=${authDuration}&scope=${encodeURIComponent(scopes)}`;
        }
    },

    async getUser() {
        const token = await Reddit.getAccessToken().then(val => {
            return val;
        });

        try {    
            const url = "https://oauth.reddit.com/api/v1/me"
            const headers = {
                "Authorization": `Bearer ${token}`,
                "User-Agent": "fgc-reddit by u/DavyK17_ (Codecademy portfolio project)",
            };
    
            const response = await fetch(url, { headers: headers });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.name;
            }
        } catch(error) {
            console.log(error);
        }
    },

    async getSubreddit(name) {
        const token = await Reddit.getAccessToken().then(val => {
            return val;
        });

        try {
            const url = `https://oauth.reddit.com/r/${name}/about`
            const headers = {
                "Authorization": `Bearer ${token}`,
                "User-Agent": "fgc-reddit by u/DavyK17_ (Codecademy portfolio project)",
            };
        
            const response = await fetch(url, { headers: headers });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.data;
            }
        } catch(error) {
            console.log(error);
        }
    },

    async getPosts(name, filter = "hot") {
        const token = await Reddit.getAccessToken().then(val => {
            return val;
        });

        try {
            const url = `https://oauth.reddit.com/r/${name}/${filter}`
            const headers = {
                "Authorization": `Bearer ${token}`,
                "User-Agent": "fgc-reddit by u/DavyK17_ (Codecademy portfolio project)",
            };
        
            const response = await fetch(url, { headers: headers });
            if (response.ok) {
                const jsonResponse = await response.json();
                const fetched = jsonResponse.data.children.map(e => e.data);
                return fetched.filter(el => !el.is_gallery && el.post_hint !== "link" && !checkNested(el, "secure_media_embed", "content"));
            }
        } catch(error) {
            console.log(error);
        }
    },
}

export default Reddit;