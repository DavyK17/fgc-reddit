import React, { useState } from "react";
import Reddit from "../../api/Reddit";
import logo from "../../logo.svg";

const Header = () => {
    const [userID, setUserID] = useState("");
    Reddit.getCurrentUserId().then(val => {
      setUserID(val);
    })

    return (
        <header>
            <div className="col logo">
                <img src={logo} alt="FGC Reddit" />
            </div>
            <div className="col search">
                <form id="search-bar">
                    <input type="search" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="col userbox">
                <a id="reddit-username" target="_blank" href={`https://www.reddit.com/user/${userID}`}>{userID}</a>
                <svg id="top-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
            </div>
        </header>
    )
}

export default Header;