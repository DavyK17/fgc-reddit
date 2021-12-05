import React from "react";
import { useSelector } from "react-redux";
import { selectUsername, selectAuthState } from "./userSlice";
import Reddit from "../../api/Reddit";

const Username = () => {
    const userID = useSelector(selectUsername);
    const authState = useSelector(selectAuthState);
    const { isLoading } = useSelector(state => state.user)

    const handleAuth = (e) => {
        e.preventDefault();
        Reddit.getAccessToken();
    }

    if (isLoading) {
        return (
            <svg className="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        )
    } else if (authState) {
        return (
            <a id="reddit-username" target="_blank" rel="noreferrer" href={`https://www.reddit.com/user/${userID}`} aria-label="Current user ID">{userID}</a>
        )
    } else {
        return (
            <a id="reddit-username" href="/" onClick={handleAuth} aria-label="Connect the web app with your Reddit account">Link with Reddit</a>
        )
    }
}

export default Username;