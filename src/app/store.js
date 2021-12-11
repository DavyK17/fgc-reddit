import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/User/userSlice";
import subredditsReducer from "../features/Subreddits/subredditsSlice";
import postsReducer from "../features/Posts/postsSlice";

export const appReducer = combineReducers({
    user: userReducer,
    subreddits: subredditsReducer,
    posts: postsReducer,
});

export const rootReducer = (state, action) => {
    if (action.type === "logoutUser") {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer
});