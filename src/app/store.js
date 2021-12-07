import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/User/userSlice";
import subredditsReducer from "../features/Subreddits/subredditsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        subreddits: subredditsReducer,
    },
});