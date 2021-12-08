import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../../features/Posts/Post";
import { fetchPosts, selectPosts } from "../../features/Posts/postsSlice";
import { selectActive } from "../../features/Subreddits/subredditsSlice";

const Posts = () => {
    const dispatch = useDispatch();
    const activeSub = useSelector(selectActive);

    const posts = useSelector(selectPosts);
    const { isLoading, hasError } = useSelector(state => state.posts);

    useEffect(() => {
        if (activeSub.display_name) {
            dispatch(fetchPosts({ name: activeSub.display_name }));
        }
    }, [dispatch, activeSub.display_name])

    const title = (
        <h2 id="subreddit-title">{activeSub.title || activeSub.display_name_prefixed || "r/Subreddit"}</h2>
    );

    if (posts.length === 0 || hasError) {
        return (
            <div className="posts">
                {title}
                <Post />
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="posts">
                {title}
                <Post />
                <Post />
            </div>
        )
    }
    
    return (
        <div className="posts">
            {title}
            {
                posts.map((s, i) => {
                    return (
                        <Post key={i} score={s.score} author={s.author} title={s.title} num_comments={s.num_comments} />
                    )
                })
            }
        </div>
    );
}

export default Posts;