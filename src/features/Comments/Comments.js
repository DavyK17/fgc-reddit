import React from "react";
import Comment from "./Comment";

const Comments = props => {
    const { handleClick } = props;
    const pluraliser = () => {
        if (props.num_comments === 1) return "comment";
        return "comments";
    }

    return (
        <>
            <div className="post-comments-container" id={`comments-${props.id}`}>
                <button type="button" className="comments-button" aria-label="Show comments" data-testid="toggle-comments" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7 11c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5-8v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z"/></svg>
                    <span className="comments-count">{props.num_comments} {pluraliser()} (excl. replies)</span>
                </button>
            </div>
            {
                props.comments.map((s, i) => {
                    return (
                        <Comment key={i} id={s.data.id} permalink={s.data.permalink} created={s.data.created_utc} author={s.data.author} body={s.data.body_html} />
                    )
                })
            }
        </>
    )
}

export default Comments;