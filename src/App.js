import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import $ from "jquery";

import "./util/reset.css";
import "./App.css";
import Reddit from './api/Reddit';
import removeURLParameter from "./util/removeURLParameter";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

import { fetchUser } from "./features/User/userSlice";
import { fetchSubs } from "./features/Subreddits/subredditsSlice";

function App() {
    const dispatch = useDispatch();
    
    const handleLogout = async () => {
        await Reddit.logoutUser();
        
        const logoutUser = { type: "logoutUser" };
        dispatch(logoutUser);
        
        const stateMatch = window.location.href.match(/state=([^&]*)/);
        const codeMatch = window.location.href.match(/code=([^&]*)/);
        
        if ((stateMatch && codeMatch)) {
            let url = removeURLParameter(window.location.href, "state");
            url = removeURLParameter(url, "code");

            window.location.href = url;
        }

        $(".sidebar").animate({
            right: `-100%`,
        }, 500);
    };

    useEffect(() => {
        const stateMatch = window.location.href.match(/state=([^&]*)/);
        const codeMatch = window.location.href.match(/code=([^&]*)/);
    
        if ((stateMatch && codeMatch) || localStorage.getItem("access_token")) {
            dispatch(fetchUser())
            .unwrap()
            .then((user) => {
                dispatch(fetchSubs());
            })
            .catch((error) => {
                console.log(error);
            });
        }
    });

    return (
        <>
            <Header handleLogout={handleLogout} />
            <Body handleLogout={handleLogout} />
        </>
    );
}

export default App;