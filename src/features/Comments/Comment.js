import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";

import { selectFilteredPosts } from "../../features/Posts/postsSlice";
import epochFromNow from "../../util/epochFromNow";

const Comment = props => {
    const dispatch = useDispatch();

    const posts = useSelector(selectFilteredPosts);
    const { isLoading } = useSelector(state => state.posts);

    const processHTML = (id, html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;

        const container = $(`#comment-text-${id}`);
        if (container.children().length > 0) return;
        
        if ((!isLoading && posts.length !== 0) && container) {
            if (!container.innerHTML) {
                container.prepend(`${txt.value}`);
                
                const links = $(`#comment-text-${id} a`);
                if (links.length > 0) {
                    links.attr("target", "_blank");
                    links.attr("rel", "noreferrer");
                }
            }
        }
    }
    const processAuthorLink = () => {
        if (props.author === "[deleted]") {
            return `https://www.reddit.com/`;
        }
        return `https://www.reddit.com/user/${props.author}`
    }

    useEffect(() => {
        processHTML(props.id, props.body);
    }, [dispatch])

    return (
        <div className="comment">
            <div className="comment-details-container">
                <div className="author-details">
                    {/* <img className="author-img" src="gaming.png" alt="Comment author" /> */}
                    <a className="author-name" href={processAuthorLink()} target="_blank" rel="noreferrer">{props.author}</a>
                </div>
                <a className="comment-time" href={`https://www.reddit.com${props.permalink}`} target="_blank" rel="noreferrer">{epochFromNow(props.created)}</a>
            </div>
            <div className="comment-content" id={`comment-text-${props.id}`}></div>
        </div>
    )
}

export default Comment;