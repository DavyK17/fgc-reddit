import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header/Header";
import { fetchUser } from "./features/User/userSlice";
import "./util/reset.css";
import "./App.css";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const stateMatch = window.location.href.match(/state=([^&]*)/);
        const codeMatch = window.location.href.match(/code=([^&]*)/);

        if (stateMatch && codeMatch) {
            dispatch(fetchUser());
        }
    });

    return (
      <Header />
    );
}

export default App;