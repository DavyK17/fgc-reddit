import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "../../util/skeleton.css";

import { selectPosts } from "../../features/Posts/postsSlice";
import Comments from "./Comments";
import epochFromNow from "../../util/epochFromNow";

const Post = props => {
    const dispatch = useDispatch();

    const posts = useSelector(selectPosts);
    const { isLoading, hasError } = useSelector(state => state.posts);

    const displayContent = () => {
        if (props.selftext_html) {
            return (
                <div className="post-text-container" id={`text-${props.id}`}></div>
            )
        }
        if (props.post_hint === "image" || props.url_overridden_by_dest) {
            if (props.url.match(/v\.redd\.it/)) {
                return (
                    <div className="post-image-container" id={`media-${props.id}`}>
                        <video className="post-image" controls>
                            <source src={`${props.secure_media.reddit_video.fallback_url}`} type="video/mp4" />
                        </video>
                    </div>
                )
            }

            return (
                <div className="post-image-container" id={`media-${props.id}`}>
                    <img src={`${props.url || props.url_overridden_by_dest}`} className="post-image" alt={`${props.title}`} />
                </div>
            )
        }
        if (props.is_video) {
            return (
                <div className="post-image-container" id={`media-${props.id}`}>
                    <video className="post-image" controls>
                        <source src={`${props.secure_media.reddit_video.fallback_url}`} type="video/mp4" />
                    </video>
                </div>
            )
        }
    }

    const processHTML = (id, html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;

        const container = document.getElementById(`text-${id}`);
        if ((!isLoading && posts.length !== 0) && container) {
            if (!container.innerHTML) {
                container.insertAdjacentHTML("afterbegin", `${txt.value}`);
            }
        }
    }

    useEffect(() => {
        processHTML(props.id, props.selftext_html);
    }, [dispatch])

    if (posts.length === 0) {
        return (
            <div className="post-container">
                <p>Select a subreddit to view posts.</p>
            </div>
        )
    }
    if (isLoading) {
        return (
            <div className="post-container">
                <div className="post-content-container">
                    <div className="post-details-container">
                        <div className="author-details">
                            <Skeleton />
                        </div>
                    </div>
                    <Skeleton />
                    <div className="post-comments-container showing-comments">
                        <Skeleton />
                    </div>
                </div>
            </div>
        )
    }
    if (hasError) {
        return (
            <div className="post-container">
                <p>An error occurred. Kindly try again.</p>
            </div>
        )
    }

    return (
        <div className="post-container">
            <div className="post-votes-container">
                <button type="button" className="vote-button up-vote" aria-label="Up vote">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
                </button>
                <span className="votes-count">{props.score}</span>
                <button type="button" className="vote-button down-vote" aria-label="Down vote">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
                </button>
            </div>
            <div className="post-content-container">
                <div className="post-details-container">
                    <div className="author-details">
                        {/* <img className="author-img" src="gaming.png" alt="Post author" /> */}
                        <a className="author-name" href={`https://www.reddit.com/user/${props.author}`} target="_blank" rel="noreferrer">{props.author}</a>
                    </div>
                    <a className="post-time mobile-only" href={props.permalink} target="_blank" rel="noreferrer">{epochFromNow(1638981865)}</a>
                    <a className="post-time lg-only" href={props.permalink} target="_blank" rel="noreferrer">{epochFromNow(1638981865)}</a>
                </div>
                <h3 className="post-title">{props.title}</h3>
                {displayContent()}
                <Comments num_comments={props.num_comments} />
            </div>
        </div>
    )
}

export default Post;