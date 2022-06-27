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
    return action.type === "logoutUser" ? appReducer(undefined, action) : appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer
});
