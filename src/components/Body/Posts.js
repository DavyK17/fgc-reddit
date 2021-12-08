import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../../features/Posts/Post";
import { fetchPosts } from "../../features/Posts/postsSlice";
import { selectActive } from "../../features/Subreddits/subredditsSlice";

const Posts = () => {
    const dispatch = useDispatch();
    const activeSub = useSelector(selectActive);

    useEffect(() => {
        if (activeSub.display_name) {
            dispatch(fetchPosts({ name: activeSub.display_name }));
        }
    }, [dispatch, activeSub.display_name])
    
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