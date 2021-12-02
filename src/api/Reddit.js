import makeID from "../util/randomString";

let state = makeID(7);
let code;

let token;
// let userID;

const clientID = "6GyLIZKwo2Oo3s1FgtecFw";
const responseType = "code";
const redirectURI = "https://192.168.100.6:3000"
const authDuration = "temporary";

const Reddit = {
    async getAccessToken() {
        if (token) return token;

        const stateMatch = window.location.href.match(/state=([^&]*)/);
        const codeMatch = window.location.href.match(/code=([^&]*)/);

        if (stateMatch && codeMatch) {
            state = stateMatch[1];
            code = codeMatch[1];

            console.log(state);
            console.log(code);

            // try {
            //     const url = "https://www.reddit.com/api/v1/access_token";
            //     const response = await fetch(url, {
            //         headers: headers,
            //         method: "POST",
            //         body: JSON.stringify({
            //             grant_type: "authorization_code",
            //             code: code,
            //             redirect_uri: redirectURI,
            //         })
            //     });
            //     if (response.ok) {
            //         const jsonResponse = await response.json();
            //         console.log(jsonResponse);
            //     }
            // } catch (error) {
            //     console.log(error);
            // }
        } else {
            console.log(state);
            const scopes = "identity vote read";
            window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${responseType}&state=${state}&redirect_uri=${encodeURIComponent(redirectURI)}&duration=${authDuration}&scope=${encodeURIComponent(scopes)}`;
        }

    }

    // async getCurrentUser() {
    //     if (userID) return userID;

    //     const url = "https://oauth.reddit.com/api/v1/me"
    // }
}

export default Reddit;