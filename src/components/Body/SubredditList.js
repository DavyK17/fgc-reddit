import React from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "../../features/Subreddits/subredditsSlice";

import gamingIcon from "../../gaming.png";

const SubredditList = () => {
    const subs = useSelector(selectSubreddits);

    return (
        <ul className="subreddit-list">
            <li>
                <button>
                    All subreddits
                </button>
            </li>
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