import React from "react";

const UpDownVote = props => {
    const { handleVote, displayScore } = props;

    return (
        <div className="post-votes-container">
            <svg className="vote-button" id={`up-vote-${props.id}`} data-testid={`up-vote-${props.id}`} aria-label="Up vote" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={handleVote}>
                <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/>
            </svg>
            <span className="votes-count" id={`vote-count-${props.id}`}>{displayScore}</span>
            <svg className="vote-button" id={`down-vote-${props.id}`} data-testid={`down-vote-${props.id}`} aria-label="Down vote" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={handleVote}>
                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
            </svg>
        </div>
    )
}

export default UpDownVote;