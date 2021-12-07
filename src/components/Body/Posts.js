import React from "react";
import Post from "./Post";

const Posts = () => {
    return (
        <main>
            <div className="posts">
                <h2 id="subreddit-title">{"r/Subreddit"}</h2>
                <Post />
            </div>
        </main>
    );
}

export default Posts;