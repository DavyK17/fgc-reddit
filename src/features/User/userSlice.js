import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Reddit from '../../api/Reddit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const user = await Reddit.getUser().then((val) => {
        return val;
    });

    return user;
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        authState: false,
        isLoading: false,
        hasError: false,
    },
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.authState = false;
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.authState = true;
            state.isLoading = false;
            state.hasError = false;
            state.name = action.payload;
        },
        [fetchUser.rejected]: (state) => {
            state.authState = false;
            state.isLoading = false;
            state.hasError = true;
        },
    },
});

export const selectUsername = (state) => state.user.name;
export const selectAuthState = (state) => state.user.authState;
export default userSlice.reducer;
