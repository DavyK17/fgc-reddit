import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/Reddit";

const subsList = [ // Subreddit display names without "r/"
    "Blazblue",
    "Brawlhalla",
    "DeadOrAlive",
    "dragonballfighterz",
    "Fighters",
    "Guiltygear",
    "INJUSTICE",
    "killerinstinct",
    "kof",
    "MortalKombat",
    "SamuraiShodown",
    "Skullgirls",
    "SoulCalibur",
    "smashbros",
    "StreetFighter",
    "Tekken",
    "ThemsFightinHerds",
    "UnderNightInBirth",
    "virtuafighter",
];

export const fetchSubs = createAsyncThunk("subreddits/fetchSubs", async () => {
    const subsData = [];
    const process = async () => {
        for (let sub of subsList) {
            const data = await Reddit.getSubreddit(sub).then(val => {
                return val;
            });

            subsData.push(data);
        }
        return subsData;
    }

    const data = await process();
    return data;
});

export const subredditsSlice = createSlice({
    name: "subreddits",
    initialState: {
        subs: [],
        isLoading: false,
        hasError: false,
    },
    extraReducers: {
        [fetchSubs.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchSubs.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.subs = action.payload;
        },
        [fetchSubs.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
    }
})

export const selectSubreddits = state => state.subreddits.subs;
export default subredditsSlice.reducer;