import React from "react";
import { useSelector } from "react-redux";

import Post from "../../features/Posts/Post";
import { selectActive } from "../../features/Subreddits/subredditsSlice";

const Posts = () => {
    const activeSub = useSelector(selectActive);
    
    return (
        <main>
            <div className="posts">
                <h2 id="subreddit-title">{activeSub.title || activeSub.display_name_prefixed || "r/Subreddit"}</h2>
                <Post />
            </div>
        </main>
    );
}

export default Posts;