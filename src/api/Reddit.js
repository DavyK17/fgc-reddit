import makeID from "../util/randomString";

let state = makeID(7);
let code;

let token;
let userID;

const clientID = "6GyLIZKwo2Oo3s1FgtecFw";
const clientSecret = "S0JhJxxfKogUviVhk0QAg5F7iQvg3w";

const responseType = "code";
const redirectURI = "https://fgc-reddit.netlify.app"
const authDuration = "permanent";

const Reddit = {
    async getAccessToken() {
        if (token) return token;

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
                    token = jsonResponse.access_token;

                    let expiryTime = Number(jsonResponse.expires_in);

                    window.setTimeout(() => token = "", expiryTime * 1000);
                    window.history.pushState("Access Token", null, "/");

                    return token;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const scopes = "identity vote read";
            window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${responseType}&state=${state}&redirect_uri=${encodeURIComponent(redirectURI)}&duration=${authDuration}&scope=${encodeURIComponent(scopes)}`;
        }
    },

    async getCurrentUserId() {
        if (userID) return userID;

        const token = await Reddit.getAccessToken().then(val => {
            return val;
        })
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
    },
}

export default Reddit;