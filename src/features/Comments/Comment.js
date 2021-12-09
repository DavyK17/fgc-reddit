import React from "react";
import $ from "jquery";

const Comment = () => {
    return (
        <div className="comment">
            <div className="comment-details-container">
                <div className="author-details">
                    {/* <img className="author-img" src="gaming.png" alt="Comment author" /> */}
                    <span className="author-name">Author</span>
                </div>
                <span className="comment-time mobile-only">8h</span>
                <span className="comment-time lg-only">8 hours ago</span>
            </div>
            <div className="comment-content">
                <p>Phasellus luctus diam in lobortis scelerisque. Donec pellentesque, purus ut posuere rhoncus, lacus ligula volutpat ante, a luctus tellus dolor quis justo. Morbi elit nisl, fermentum a pretium et, varius ac metus. Mauris
                    tempus velit ut venenatis luctus. Donec vehicula mauris at dictum pharetra. Etiam semper libero ac felis semper, a laoreet augue congue. Sed consectetur dolor sed lectus varius pellentesque id et sapien.</p>
            </div>
        </div>
    )
}

export default Comment;