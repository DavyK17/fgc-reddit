import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { store } from '../../app/store';
import UpDownVote from '../../features/Posts/UpDownVote';
import Comments from '../../features/Comments/Comments';
import { fetchPosts } from "../../features/Posts/postsSlice";

import { postsMock } from './Posts.spec';

const post = postsMock[0];

test("calls displayScore() when UpDownVote component is rendered", () => {
    const displayScore = jest.fn();

    render(
        <Provider store={store}>
            <UpDownVote id={post.id} displayScore={displayScore()} />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchPosts.fulfilled.type, payload: postsMock }
    }
    store.dispatch(fetchMock());

    expect(displayScore).toBeCalled();
});

test("calls handleVote() when up vote button is clicked", () => {
    const handleMock = jest.fn();

    render(
        <Provider store={store}>
            <UpDownVote id={post.id} handleVote={handleMock} />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchPosts.fulfilled.type, payload: postsMock }
    }
    store.dispatch(fetchMock());

    userEvent.click(screen.getByTestId("up-vote-r5kux2"));
    expect(handleMock).toBeCalled();
});

test("calls handleVote() when down vote button is clicked", () => {
    const handleMock = jest.fn();

    render(
        <Provider store={store}>
            <UpDownVote id={post.id} handleVote={handleMock} />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchPosts.fulfilled.type, payload: postsMock }
    }
    store.dispatch(fetchMock());

    userEvent.click(screen.getByTestId("down-vote-r5kux2"));
    expect(handleMock).toBeCalled();
});

test("calls toggleComments() when comments button is clicked", () => {
    const toggleMock = jest.fn();

    render(
        <Provider store={store}>
            <Comments id={post.id} num_comments={post.comments.length || 0} comments={post.comments} handleClick={toggleMock} />
        </Provider>
    );
    const fetchMock = () => {
        return { type: fetchPosts.fulfilled.type, payload: postsMock }
    }
    store.dispatch(fetchMock());

    userEvent.click(screen.getByTestId("toggle-comments-r5kux2"));
    expect(toggleMock).toBeCalled();
});