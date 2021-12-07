import React from "react";
import { useDispatch } from "react-redux";

import $ from "jquery";
import icon from "../../img/icon.svg";
import logo from "../../img/logo.svg";

import User from "../../features/User/User";
import { fetchUser } from "../../features/User/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    
    const openSidebar = () => {
        $(".sidebar").animate({
            right: "0",
        }, 500);
    };

    const handleAuth = (e) => {
        e.preventDefault();
        dispatch(fetchUser());
    };

    return (
        <header>
            <div className="col logo">
                <img className="mobile-only" src={icon} alt="FGC Reddit" />
                <img className="lg-only" src={logo} alt="FGC Reddit" />
            </div>
            <div className="col search">
                <form id="search-bar">
                    <input type="search" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="col userbox">
                <User handleAuth={handleAuth} />
                <svg id="top-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={openSidebar}>
                    <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
                </svg>
            </div>
        </header>
    )
}

export default Header;