import React from "react";
import Posts from "./Posts";
import Sidebar from "./Sidebar";

const Body = () => {
    return (
        <section className="reddit">
            <main>
                <Posts />
            </main>
            <Sidebar />
      </section>
    );
}

export default Body;