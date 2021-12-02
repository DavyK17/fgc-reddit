import React, { useState } from "react";
import Reddit from "../../api/Reddit";

const Username = () => {
    const [userID, setUserID] = useState("");
    const [authState, setAuthState] = useState(false);

    const handleAuth = (e) => {
        e.preventDefault();
        Reddit.getAccessToken();
    }

    const stateMatch = window.location.href.match(/state=([^&]*)/);
    const codeMatch = window.location.href.match(/code=([^&]*)/);
    if (stateMatch && codeMatch) {
        Reddit.getCurrentUserId().then(val => {
            setUserID(val);
            setAuthState(true);
        })
    }

    if (authState) {
        return (
            <a id="reddit-username" target="_blank" rel="noreferrer" href={`https://www.reddit.com/user/${userID}`} aria-label="Current user ID">{userID}</a>
        )
    } else {
        return (
            <a id="reddit-username" href="/" onClick={handleAuth} aria-label="Sign in">Sign in</a>
        )
    }
}

export default Username;