import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./util/reset.css";
import "./App.css";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

import { fetchUser } from "./features/User/userSlice";
import { fetchSubs } from "./features/Subreddits/subredditsSlice";

function App() {
    const dispatch = useDispatch();

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
            <Header />
            <Body />
        </>
    );
}

export default App;