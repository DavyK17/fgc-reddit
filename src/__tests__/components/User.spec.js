import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '../../app/store';
import User from "../../features/User/User";
import { fetchUser } from "../../features/User/userSlice";

test("renders Reddit authentication link by default", () => {
    render(
        <Provider store={store}>
            <User />
        </Provider>
    );

    expect(screen.getByText("Link with Reddit")).toBeInTheDocument();
});

test("calls handleAuth() when Reddit authentication link is clicked", () => {
    const handleAuthMock = jest.fn();

    render(
        <Provider store={store}>
            <User handleAuth={handleAuthMock} />
        </Provider>
    );

    userEvent.click(screen.getByText("Link with Reddit"));
    expect(handleAuthMock).toBeCalled();
});

test("displays SVG spinner while authentication is pending", () => {
    render(
        <Provider store={store}>
            <User />
        </Provider>
    );
    const authMock = () => {
        return { type: fetchUser.pending.type }
    }
    store.dispatch(authMock());

    expect(screen.getByTestId("loading")).toBeInTheDocument(); 
});

test("displays user's Reddit username when authentication is fulfilled", () => {
    render(
        <Provider store={store}>
            <User />
        </Provider>
    );
    const authMock = () => {
        return { type: fetchUser.fulfilled.type, payload: "User" }
    }
    store.dispatch(authMock());

    expect(screen.getByText("User")).toBeInTheDocument(); 
});