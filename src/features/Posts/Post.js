import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";

import Skeleton from "react-loading-skeleton";
import "../../util/skeleton.css";

import { selectActive } from "../Subreddits/subredditsSlice";
import { selectFilteredPosts } from "../../features/Posts/postsSlice";
import Comments from "../Comments/Comments";
import epochFromNow from "../../util/epochFromNow";

const Post = props => {
    const dispatch = useDispatch();
    const activeSub = useSelector(selectActive);

    const posts = useSelector(selectFilteredPosts);
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
    const displayScore = () => {
        if (props.hide_score) return "Vote";
        return props.score;
    }

    const toggleComments = ({ target }) => {
        if (props.comments.length === 0) return;

        const container = $(target).parents(".post-comments-container");
        container.toggleClass("showing-comments");

        const comments = container.nextAll(".comment");
        if (container.hasClass("showing-comments")) {
            comments.show();
        } else {
            comments.hide();
        }
    }

    const processHTML = (id, html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;

        const container = $(`#text-${id}`);
        if (container.children().length > 0) return;

        if ((!isLoading && posts.length !== 0) && container) {
            if (!container.innerHTML) {
                container.prepend(`${txt.value}`);
                
                const links = $(`#text-${id} a`);
                if (links.length > 0) {
                    links.attr("target", "_blank");
                    links.attr("rel", "noreferrer");
                }
            }
        }
    }
    const processMedia = id => {
        const container = $(`#media-${id}`);
        container.children().each(function(i) {
            if (!$(this).is("img") && !$(this).is("video")) {
                $(this).remove();
            }
        })
    }

    useEffect(() => {
        processHTML(props.id, props.selftext_html);
        processMedia(props.id);
    }, [dispatch, props.id, props.selftext_html])

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
                <p>An error has occurred. Kindly try again.</p>
            </div>
        )
    }
    if (activeSub.display_name && posts.length === 0) {
        return (
            <div className="post-container">
                <p>There are no posts to show.</p>
            </div>
        )
    }
    if (posts.length === 0) {
        return (
            <div className="post-container">
                <p>Select a subreddit to view posts.</p>
            </div>
        )
    }

    return (
        <div className="post-container">
            <div className="post-votes-container">
                <button type="button" className="vote-button up-vote" aria-label="Up vote">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
                </button>
                <span className="votes-count">{displayScore()}</span>
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
                    <span className="bullet" style={{ color: props.sub_color }}></span>
                    <a className="post-time" href={props.permalink} target="_blank" rel="noreferrer">{epochFromNow(props.created)}</a>
                </div>
                <h3 className="post-title">{props.title}</h3>
                {displayContent()}
                <Comments id={props.id} num_comments={props.comments.length || 0} comments={props.comments} handleClick={toggleComments} />
            </div>
        </div>
    )
}

export default Post;