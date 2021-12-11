import makeID from '../util/randomString';
import checkNested from '../util/checkNested';

let state = makeID(7);
let code;
let expiryTime;

const clientID = process.env.NODE_ENV === 'production' ? '6GyLIZKwo2Oo3s1FgtecFw' : 'UTzjq5fgYGrdKJogTOjwKw';
const clientSecret =
  process.env.NODE_ENV === 'production' ? 'S0JhJxxfKogUviVhk0QAg5F7iQvg3w' : 'kepD_jqAWpk3O4IW2FPYiXUimTto7w';
const userAgent = 'fgc-reddit by u/DavyK17_ (Codecademy portfolio project)';

const responseType = 'code';
const redirectURI = process.env.NODE_ENV === 'production' ? 'https://fgc-reddit.netlify.app' : 'http://localhost:3000';
const authDuration = 'permanent';

const Reddit = {
  getAccessToken: async () => {
    if (localStorage.getItem('access_token')) return localStorage.getItem('access_token');

    const stateMatch = window.location.href.match(/state=([^&]*)/);
    const codeMatch = window.location.href.match(/code=([^&]*)/);

    if (stateMatch && codeMatch) {
      state = stateMatch[1];
      code = codeMatch[1].match(/.*[^(#_)]/)[0];

      const data = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectURI,
      });
      try {
        const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
        const url = 'https://www.reddit.com/api/v1/access_token';
        const headers = {
          Authorization: `Basic ${credentials}`,
          'User-Agent': `${userAgent}`,
        };

        const response = await fetch(url, {
          headers: headers,
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          localStorage.setItem('access_token', jsonResponse.access_token);
          localStorage.setItem('refresh_token', jsonResponse.refresh_token);

          expiryTime = Number(jsonResponse.expires_in);

          window.setTimeout(() => Reddit.refreshAccessToken(), expiryTime * 1000);

          return localStorage.getItem('access_token');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const scopes = 'identity vote read';
      window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=${responseType}&state=${state}&redirect_uri=${encodeURIComponent(
        redirectURI
      )}&duration=${authDuration}&scope=${encodeURIComponent(scopes)}`;
    }
  },

  refreshAccessToken: async () => {
    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: localStorage.getItem('refresh_token'),
    });
    try {
      const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
      const url = 'https://www.reddit.com/api/v1/access_token';
      const headers = {
        Authorization: `Basic ${credentials}`,
        'User-Agent': `${userAgent}`,
      };

      const response = await fetch(url, {
        headers: headers,
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        localStorage.setItem('access_token', jsonResponse.access_token);

        expiryTime = Number(jsonResponse.expires_in);

        return localStorage.getItem('access_token');
      }
    } catch (error) {
      console.log(error);
    }
  },

  getUser: async () => {
    const token = await Reddit.getAccessToken().then((val) => {
      return val;
    });

    try {
      const url = 'https://oauth.reddit.com/api/v1/me';
      const headers = {
        Authorization: `Bearer ${token}`,
        'User-Agent': `${userAgent}`,
      };

      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.name;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getSubreddit: async (name) => {
    const token = await Reddit.getAccessToken().then((val) => {
      return val;
    });

    try {
      const url = `https://oauth.reddit.com/r/${name}/about`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'User-Agent': `${userAgent}`,
      };

      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getPosts: async (name, filter = 'hot') => {
    const token = await Reddit.getAccessToken().then((val) => {
      return val;
    });

    try {
      const url = `https://oauth.reddit.com/r/${name}/${filter}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'User-Agent': `${userAgent}`,
      };

      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        const fetched = jsonResponse.data.children.map((e) => e.data);
        return fetched.filter(
          (el) => !el.is_gallery && el.post_hint !== 'link' && !checkNested(el, 'secure_media_embed', 'content')
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  getComments: async (subreddit, article) => {
    const token = await Reddit.getAccessToken().then((val) => {
      return val;
    });

    try {
      const url = `https://oauth.reddit.com/r/${subreddit}/comments/${article}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'User-Agent': `${userAgent}`,
      };

      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse[1].data.children;
      }
    } catch (error) {
      console.log(error);
    }
  },

  castVote: async (direction, id) => {
    const token = await Reddit.getAccessToken().then((val) => {
      return val;
    });

    try {
      const url = `https://oauth.reddit.com/api/vote`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'User-Agent': `${userAgent}`,
      };
      const data = new URLSearchParams({
        dir: direction,
        id: id,
      });

      const response = await fetch(url, { method: 'POST', headers: headers, body: data });
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Reddit;
