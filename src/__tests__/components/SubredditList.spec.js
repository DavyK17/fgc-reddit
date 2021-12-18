import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '../../app/store';
import SubredditList from '../../features/Subreddits/SubredditList';
import { fetchSubs, setActive } from "../../features/Subreddits/subredditsSlice";

const subsMock = [
    {
      display_name: 'Blazblue',
      title: 'Blazblue ',
      icon_img: '',
      name: 't5_2s6iq',
      community_icon: 'https://styles.redditmedia.com/t5_2s6iq/styles/communityIcon_2eihmjs01a941.jpg?width=256&amp;s=ada9e4d1579b1564136606554e0993b824952f87',
      key_color: '#24a0ed',
    },
    {
      display_name: 'Brawlhalla',
      title: 'Brawlhalla',
      icon_img: 'https://b.thumbs.redditmedia.com/3D5KBfqlzG8waaZFwr4ZklYQB2rOKlVTKYV9butYtNY.png',
      name: 't5_31c1d',
      community_icon: 'https://styles.redditmedia.com/t5_31c1d/styles/communityIcon_1iqu6sahshy11.png?width=256&amp;s=93a8cc48f7821e15bf44ddfa808d614690c7c687',
      key_color: '#24a0ed',
    },
];

test("renders placeholder text by default", () => {
    render(
        <Provider store={store}>
            <SubredditList />
        </Provider>
    );

    expect(screen.getByText("Link with Reddit to view list")).toBeInTheDocument();
});

test("renders loading skeleton while fetch is pending", () => {
    render(
        <Provider store={store}>
            <SubredditList />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchSubs.pending.type }
    }
    store.dispatch(fetchMock());

    expect(screen.getByTestId("subreddit-list-loading")).toBeInTheDocument();
});

describe("when fetch is fulfilled", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <SubredditList />
            </Provider>
        );
        const fetchMock = () => {
            return { type: fetchSubs.fulfilled.type, payload: subsMock }
        }
        store.dispatch(fetchMock());
    });

    test("renders list of subreddits", () => {
        expect(screen.getByText("Blazblue")).toBeInTheDocument();
        expect(screen.getByText("Brawlhalla")).toBeInTheDocument(); 
    });

    test("renders placeholder text when logout button is clicked", () => {
        store.dispatch({ type: "logoutUser" });
        expect(screen.getByText("Link with Reddit to view list")).toBeInTheDocument();
    });
});

test("renders error text when fetch is rejected", () => {
    render(
        <Provider store={store}>
            <SubredditList />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchSubs.rejected.type }
    }
    store.dispatch(fetchMock());

    expect(screen.getByText("An error has occurred. Kindly try again.")).toBeInTheDocument();
});

describe("when subreddit button is clicked", () => {
    const handleMock = jest.fn();

    beforeEach(() => {
        render(
            <Provider store={store}>
                <SubredditList handleActive={handleMock} />
            </Provider>
        );
        const fetchMock = () => {
            return { type: fetchSubs.fulfilled.type, payload: subsMock }
        }
        store.dispatch(fetchMock());
    
        userEvent.click(screen.getByText("Blazblue"));
        const activeMock = {
            display_name: 'Blazblue',
            title: 'Blazblue',
        };

        const setMock = () => {
            return { type: setActive.type, payload: activeMock };
        }
        store.dispatch(setMock());
    });

    test("calls handleActive()", () => {
        expect(handleMock).toBeCalled();
    });

    test("renders listing filters", () => {
        expect(screen.getByText("Hot")).toBeInTheDocument();
        expect(screen.getByText("New")).toBeInTheDocument();
        expect(screen.getByText("Top")).toBeInTheDocument();
        expect(screen.getByText("Rising")).toBeInTheDocument();
    });
});