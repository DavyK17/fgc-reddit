import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "./Post";
import { fetchPosts, selectPosts, selectFilter } from "./postsSlice";
import { selectActive } from "../Subreddits/subredditsSlice";

const Posts = () => {
    const dispatch = useDispatch();
    const activeSub = useSelector(selectActive);

    const posts = useSelector(selectPosts);
    const filter = useSelector(selectFilter);
    const { isLoading, hasError } = useSelector(state => state.posts);

    useEffect(() => {
        if (activeSub.display_name) {
            dispatch(fetchPosts({ name: activeSub.display_name, filter: filter }));
        }
    }, [dispatch, activeSub.display_name, filter])

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
                        <Post key={i} id={s.id} created={s.created} url={s.url} url_overridden_by_dest={s.url_overridden_by_dest} permalink={`https://www.reddit.com${s.permalink}`} post_hint={s.post_hint} score={s.score} author={s.author} title={s.title} num_comments={s.num_comments} selftext_html={s.selftext_html} is_video={s.is_video} secure_media={s.secure_media} secure_media_embed={s.secure_media_embed} />
                    )
                })
            }
        </div>
    );
}

export default Posts;