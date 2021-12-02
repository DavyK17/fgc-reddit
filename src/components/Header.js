import React from "react";
import logo from "../logo.svg";

const Header = props => {
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
                <p id="reddit-username">{props.username}</p>
                <svg id="top-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
            </div>
        </header>
    )
}

export default Header;