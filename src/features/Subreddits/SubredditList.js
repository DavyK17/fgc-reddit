import React from "react";
import Skeleton from "react-loading-skeleton";
import $ from "jquery";
import "../../util/skeleton.css";

import { useSelector } from "react-redux";
import { selectSubreddits, selectActive } from "./subredditsSlice";

import gamingIcon from "../../img/gaming.png";

const SubredditList = props => {
    const subs = useSelector(selectSubreddits);
    const active = useSelector(selectActive);
    const { isLoading, hasError } = useSelector(state => state.subreddits);
    const { handleActive } = props;

    const handleSelect = ({ target }) => {
        if (active) {
            $(`#${active.name}`).removeClass("subreddit-selected");
        }
        $(`#${target.id}`).addClass("subreddit-selected");

        const selected = subs.filter(sub => sub.name === target.id)[0];
        handleActive(selected);
    }

    if (isLoading) {
        return (
            <ul className="subreddit-list">
                <li>
                    <Skeleton containerTestId="subreddit-list-loading" />
                </li>
            </ul>
        )
    }
    if (hasError) {
        return (
            <ul className="subreddit-list">
                <li>
                    <p className="placeholder" style={{ fontSize: "1.25rem", color: "rgba(26, 26, 26, 0.75)" }}>An error has occurred. Kindly try again.</p>
                </li>
            </ul>
        )
    }
    if (subs.length === 0) {
        return (
            <ul className="subreddit-list">
                <li>
                    <p className="placeholder" style={{ fontSize: "1.25rem", color: "rgba(26, 26, 26, 0.75)" }}>Link with Reddit to view list</p>
                </li>
            </ul>
        )
    }
    
    return (
        <>
            <ul className="subreddit-filters">
                <li id="subreddit-hot">Hot</li>
                <li id="subreddit-new">New</li>
                <li id="subreddit-top">Top</li>
                <li id="subreddit-rising">Rising</li>
            </ul>
            <ul className="subreddit-list">
                {
                    subs.map((s, i) => {
                        if (!s) return null;

                        const iconStyle = {
                            border: `2px solid ${s.key_color}`,
                        }
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

                        const selectedStyle = () => {
                            if (active.name === s.name) {
                                return {
                                    borderRight: `10px solid ${s.key_color}`,
                                }
                            }
                        }

                        return (
                            <li key={i}>
                                <button id={s.name} onClick={handleSelect} style={selectedStyle()}>
                                    <img className="subreddit-icon" src={getIconSrc()} alt="" style={iconStyle} />
                                    {s.display_name}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default SubredditList;