import Immutable from "seamless-immutable";
import userReducer, { fetchUser } from "../../features/User/userSlice";

const initialState = Immutable({
    name: "",
    authState: false,
    isLoading: false,
    hasError: false
});

test("has a default state", () => {
    const action = { type: "undefined" };
    
    expect(userReducer(undefined, action)).toEqual(initialState);
});

test("sets loading state to 'true' when fetchUser is pending", () => {
    const action = { type: fetchUser.pending.type };
    const state = userReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        isLoading: true,
    });

    expect(state).toEqual(expected);
});

test("sets authentication state to 'true' and updates username when fetchUser is fulfilled", () => {
    const action = { type: fetchUser.fulfilled.type, payload: "User" };
    const state = userReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        name: "User",
        authState: true,
    });

    expect(state).toEqual(expected);
});

test("sets error state to 'true' when fetchUser is rejected", () => {
    const action = { type: fetchUser.rejected.type };
    const state = userReducer(initialState, action);
    const expected = Immutable({
        ...initialState,
        hasError: true,
    });

    expect(state).toEqual(expected);
});