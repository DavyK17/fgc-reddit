import React from "react";

const Search = props => {
    const { onSearchSubmit } = props;

    return (
        <form id="search-bar" onSubmit={onSearchSubmit}>
            <input
                type="search"
                placeholder="Search"
                aria-label="Search posts"
            />
            <button type="submit" onClick={onSearchSubmit}>Search</button>
        </form>
    )
}

export default Search;