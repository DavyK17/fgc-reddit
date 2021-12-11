import React from "react";
import Posts from "../../features/Posts/Posts";
import Sidebar from "./Sidebar";

const Body = (props) => {
    const { handleLogout } = props;

    return (
        <section className="reddit">
            <main>
                <Posts />
            </main>
            <Sidebar handleLogout={handleLogout} />
        </section>
    );
}

export default Body;