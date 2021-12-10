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

        const container = document.getElementById(`comment-text-${id}`);
        if ((!isLoading && posts.length !== 0) && container) {
            if (!container.innerHTML) {
                container.insertAdjacentHTML("afterbegin", `${txt.value}`);
            }
        }
    }

    useEffect(() => {
        processHTML(props.id, props.body);
    }, [dispatch])

    return (
        <div className="comment">
            <div className="comment-details-container">
                <div className="author-details">
                    {/* <img className="author-img" src="gaming.png" alt="Comment author" /> */}
                    <a className="author-name" href={`https://www.reddit.com/user/${props.author}`} target="_blank" rel="noreferrer">{props.author}</a>
                </div>
                <a className="comment-time" href={`https://www.reddit.com${props.permalink}`} target="_blank" rel="noreferrer">{epochFromNow(props.created)}</a>
            </div>
            <div className="comment-content" id={`comment-text-${props.id}`}></div>
        </div>
    )
}

export default Comment;