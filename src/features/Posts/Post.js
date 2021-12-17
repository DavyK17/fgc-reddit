import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHlsPlayer from "react-hls-player";
import $ from "jquery";

import Reddit from "../../api/Reddit";
import Skeleton from "react-loading-skeleton";
import "../../util/skeleton.css";

import { selectActive } from "../Subreddits/subredditsSlice";
import { selectFilteredPosts } from "../../features/Posts/postsSlice";

import UpDownVote from "./UpDownVote";
import Comments from "../Comments/Comments";
import epochFromNow from "../../util/epochFromNow";

const Post = props => {
    const dispatch = useDispatch();

    const activeSub = useSelector(selectActive);
    const posts = useSelector(selectFilteredPosts);
    const { isLoading, hasError } = useSelector(state => state.posts);

    const voting = {
        voted: false,
        dir: 0,
        score: props.score,
    }

    useEffect(() => {
        if (props.likes === true) {
            voting.voted = true;
            voting.dir = 1;
            $(`#up-vote-${props.id}`).css({ fill: `${props.sub_color}`, opacity: 1 });
        }
    
        if (props.likes === false) {
            voting.voted = true;
            voting.dir = -1;
            $(`#down-vote-${props.id}`).css({ fill: `${props.sub_color}`, opacity: 1 });
        }
    }, [dispatch])

    const handleVote = async (e) => {
        e.preventDefault();

        if (!voting.voted) {
            if (e.target.getAttribute("aria-label") === "Up vote") {
                const data = await Reddit.castVote("1", props.fullname).then(val => {
                    return val;
                });
    
                voting.voted = true;
                voting.dir = 1;
                voting.score++;
    
                $(`#vote-count-${props.id}`).text(voting.score);
                $(`#up-vote-${props.id}`).css({ fill: `${props.sub_color}`, opacity: 1 });
        
                return data;
            }

            if (e.target.getAttribute("aria-label") === "Down vote") {
                const data = await Reddit.castVote("-1", props.fullname).then(val => {
                    return val;
                });
    
                voting.voted = true;
                voting.dir = -1;
                voting.score--;
    
                $(`#vote-count-${props.id}`).text(voting.score);
                $(`#down-vote-${props.id}`).css({ fill: `${props.sub_color}`, opacity: 1 });
    
                return data;
            }
        }

        if (voting.voted) {
            if (voting.dir === 1) {
                if (e.target.getAttribute("aria-label") === "Up vote") {
                    const data = await Reddit.castVote("0", props.fullname).then(val => {
                        return val;
                    });
        
                    voting.voted = false;
                    voting.dir = 0;
                    voting.score--;
        
                    $(`#vote-count-${props.id}`).text(voting.score);
                    $(`#up-vote-${props.id}`).css({ fill: "initial", opacity: 0.5 });
        
                    return data;
                }

                if (e.target.getAttribute("aria-label") === "Down vote") {
                    const data = await Reddit.castVote("-1", props.fullname).then(val => {
                        return val;
                    });
        
                    voting.dir = -1;
                    voting.score -= 2;
        
                    $(`#vote-count-${props.id}`).text(voting.score);
                    $(`#up-vote-${props.id}`).css({ fill: "initial", opacity: 0.5 });
                    $(`#down-vote-${props.id}`).css({ fill: `${props.sub_color}`, opacity: 1 });
        
                    return data;
                }
            }

            if (voting.dir === -1) {
                if (e.target.getAttribute("aria-label") === "Up vote") {
                    const data = await Reddit.castVote("1", props.fullname).then(val => {
                        return val;
                    });
        
                    voting.dir = 1;
                    voting.score += 2;
        
                    $(`#vote-count-${props.id}`).text(voting.score);
                    $(`#down-vote-${props.id}`).css({ fill: "initial", opacity: 0.5 });
                    $(`#up-vote-${props.id}`).css({ fill: `${props.sub_color}`, opacity: 1 });
        
                    return data;
                }

                if (e.target.getAttribute("aria-label") === "Down vote") {
                    const data = await Reddit.castVote("0", props.fullname).then(val => {
                        return val;
                    });
        
                    voting.voted = false;
                    voting.dir = 0;
                    voting.score++;
        
                    $(`#vote-count-${props.id}`).text(voting.score);
                    $(`#down-vote-${props.id}`).css({ fill: "initial", opacity: 0.5 });
        
                    return data;
                }
            }
        }
    }

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
                        <ReactHlsPlayer
                            src={`${props.secure_media.reddit_video.hls_url}`}
                            autoPlay={false}
                            controls={true}
                        />
                    </div>
                )
            }

            return (
                <div className="post-image-container" id={`media-${props.id}`}>
                    <img src={`${props.url || props.url_overridden_by_dest}`} alt={`${props.title}`} />
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
        return voting.score;
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
    const processAuthorLink = () => {
        if (props.author === "[deleted]") {
            return `https://www.reddit.com/`;
        }
        return `https://www.reddit.com/user/${props.author}`
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
                            <Skeleton containerTestId="author-loading" />
                        </div>
                    </div>
                    <Skeleton containerTestId="post-loading" />
                    <div className="post-comments-container showing-comments">
                        <Skeleton containerTestId="comment-loading" />
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
            <UpDownVote id={props.id} handleVote={handleVote} displayScore={displayScore()} />
            <div className="post-content-container">
                <div className="post-details-container">
                    <div className="author-details">
                        {/* <img className="author-img" src="gaming.png" alt="Post author" /> */}
                        <a className="author-name" href={processAuthorLink()} target="_blank" rel="noreferrer">{props.author}</a>
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