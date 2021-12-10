import Immutable from "seamless-immutable";
import postsReducer, { fetchPosts, setSearchTerm, setFilter } from "../../features/Posts/postsSlice";

const initialState = Immutable({
    posts: [],
    isLoading: false,
    hasError: false,
    searchTerm: "",
    filter: "hot",
});

test("has a default state", () => {
    const action = { type: "undefined" };
    
    expect(postsReducer(undefined, action)).toEqual(initialState);
});

test("sets loading state to 'true' when fetchPosts is pending", () => {
    const action = { type: fetchPosts.pending.type };
    const state = postsReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        isLoading: true,
    });

    expect(state).toEqual(expected);
});

test("populates posts array when fetchPosts is fulfilled", () => {
    const postsMock = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const action = { type: fetchPosts.fulfilled.type, payload: postsMock };
    const state = postsReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        posts: postsMock,
    });

    expect(state).toEqual(expected); 
});

test("sets error state to 'true' when fetchPosts is rejected", () => {
    const action = { type: fetchPosts.rejected.type };
    const state = postsReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        hasError: true,
    });

    expect(state).toEqual(expected);
});

test("assigns new search term in state when setSearchTerm is called", () => {
    const searchTermMock = "Hello world";
    const action = { type: setSearchTerm.type, payload: searchTermMock };
    const state = postsReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        searchTerm: searchTermMock,
    });

    expect(state).toEqual(expected); 
});

test("assigns new listing filter in state when setFilter is called", () => {
    const filterMock = "new";
    const action = { type: setFilter.type, payload: filterMock };
    const state = postsReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        filter: filterMock,
    });

    expect(state).toEqual(expected); 
});