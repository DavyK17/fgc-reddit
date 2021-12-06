import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import User from "../../features/User/User";

test("renders Reddit authentication link by default", () => {
    const { getByText } = render( 
        <Provider store={store}>
            <User />
        </Provider>
    );

    expect(getByText("Link with Reddit")).toBeInTheDocument();
});