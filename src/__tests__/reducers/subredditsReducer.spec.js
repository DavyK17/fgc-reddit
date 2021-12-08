import Immutable from "seamless-immutable";
import subredditsReducer, { fetchSubs, setActive } from "../../features/Subreddits/subredditsSlice";

const initialState = Immutable({
    subs: [],
    isLoading: false,
    hasError: false,
    active: {},
});

test("has a default state", () => {
    const action = { type: "undefined" };
    
    expect(subredditsReducer(undefined, action)).toEqual(initialState);
});

test("sets loading state to 'true' when fetchSubs is pending", () => {
    const action = { type: fetchSubs.pending.type };
    const state = subredditsReducer(initialState, action);
    const expected = Immutable({
        subs: [],
        isLoading: true,
        hasError: false,
        active: {},
    });

    expect(state).toEqual(expected);
});

test("populates subreddits array when fetchSubs is fulfilled", () => {
    const subsMock = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const action = { type: fetchSubs.fulfilled.type, payload: subsMock };
    const state = subredditsReducer(initialState, action);
    const expected = Immutable({
        subs: subsMock,
        isLoading: false,
        hasError: false,
        active: {},
    });

    expect(state).toEqual(expected); 
});

test("sets error state to 'true' when fetchSubs is rejected", () => {
    const action = { type: fetchSubs.rejected.type };
    const state = subredditsReducer(initialState, action);
    const expected = Immutable({
        subs: [],
        isLoading: false,
        hasError: true,
        active: {},
    });

    expect(state).toEqual(expected);
});

test("populates active object in state when setActive is called", () => {
    const activeMock = { id: 1 };
    const action = { type: setActive.type, payload: activeMock };
    const state = subredditsReducer(initialState, action);
    const expected = Immutable({
        subs: [],
        isLoading: false,
        hasError: false,
        active: activeMock,
    });

    expect(state).toEqual(expected); 
});