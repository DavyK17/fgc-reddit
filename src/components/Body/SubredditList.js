import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../util/skeleton.css";

import { useSelector } from "react-redux";
import { selectSubreddits } from "../../features/Subreddits/subredditsSlice";

import gamingIcon from "../../gaming.png";

const SubredditList = () => {
    const subs = useSelector(selectSubreddits);
    const { isLoading, hasError } = useSelector(state => state.subreddits)

    if (isLoading) {
        return (
            <ul className="subreddit-list">
                <li>
                    <Skeleton />
                </li>
            </ul>
        )
    }
    if (hasError) {
        return (
            <ul className="subreddit-list">
                <li>
                    <p style={{ fontSize: "1.25rem", color: "rgba(26, 26, 26, 0.75)" }}>An error has occurred. Kindly try again.</p>
                </li>
            </ul>
        )
    }
    if (subs.length === 0) {
        return (
            <ul className="subreddit-list">
                <li>
                    <p style={{ fontSize: "1.25rem", color: "rgba(26, 26, 26, 0.75)" }}>Link with Reddit to view list</p>
                </li>
            </ul>
        )
    }
    
    return (
        <ul className="subreddit-list">
            {
                subs.map((s, i) => {
                    if (!s) return null;

                    const iconStyle = {
                        border: `2px solid ${s.key_color}`,
                    }
                    // const selectedStyle = {
                    //     borderRight: `10px solid ${s.key_color}`,
                    // }


                    const getIconSrc = () => {
                        if (!s.community_icon) {
                            if (!s.icon_img) {
                                return gamingIcon;
                            }
                            return s.icon_img;
                        }

                        const iconSrc = s.community_icon.match(/((.*png)|(.*jpg))/g);
                        return iconSrc;
                    }

                    return (
                        <li key={i}>
                            <button>
                            {/* <button style={selectedStyle}> */}
                                <img className="subreddit-icon" src={getIconSrc()} alt="" style={iconStyle} />
                                {s.display_name}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default SubredditList;