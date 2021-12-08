import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/Reddit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ name, filter }) => {
    const data = await Reddit.getPosts(name, filter).then(val => {
        return val;
    });

    return data;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        searchTerm: "",
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.posts = action.payload;
            state.searchTerm = "";
        },
        [fetchPosts.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
});

export const selectPosts = state => state.posts.posts;
export const selectSearchTerm = state => state.posts.searchTerm;
export const { setPosts, setSearchTerm } = postsSlice.actions;
export default postsSlice.reducer;