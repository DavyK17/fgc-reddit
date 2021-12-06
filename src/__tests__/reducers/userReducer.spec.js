import userReducer, { fetchUser } from "../../features/User/userSlice";

const initialState = {
    name: "",
    authState: false,
    isLoading: false,
    hasError: false
};

test("has a default state", () => {
    const action = { type: "undefined" };
    
    expect(userReducer(undefined, action)).toEqual(initialState);
});

test("sets loading state to 'true' when fetchUser is pending", () => {
    const action = { type: fetchUser.pending.type };
    const state = userReducer(initialState, action);
    const expected = {
        name: "",
        authState: false,
        isLoading: true,
        hasError: false,
    };

    expect(state).toEqual(expected);
});

test("sets authentication state to 'true' and updates username when fetchUser is fulfilled", () => {
    const action = { type: fetchUser.fulfilled.type, payload: "DavyK17" };
    const state = userReducer(initialState, action);
    const expected = {
        name: "DavyK17",
        authState: true,
        isLoading: false,
        hasError: false,
    };

    expect(state).toEqual(expected);
});

test("sets error state to 'true' when fetchUser is rejected", () => {
    const action = { type: fetchUser.rejected.type };
    const state = userReducer(initialState, action);
    const expected = {
        name: "",
        authState: false,
        isLoading: false,
        hasError: true,
    };

    expect(state).toEqual(expected);
});