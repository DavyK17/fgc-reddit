import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/Reddit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ name, filter }) => {
    const data = await Reddit.getPosts(name, filter).then(async (val) => {
        const posts = await val.map(async (post) => {
            const comments = await Reddit.getComments(post.subreddit, post.id).then(val => {
                return val;
            });
    
            return { ...post, comments: comments };
        });
        
        return posts;
    });

    const processed = Promise.all(data).then(val => {
        return val;
    });
    
    return processed;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false,
        searchTerm: "",
        filter: "",
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
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
export const selectFilter = state => state.posts.filter;
export const { setSearchTerm, setFilter } = postsSlice.actions;
export default postsSlice.reducer;