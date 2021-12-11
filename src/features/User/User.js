import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername, selectAuthState } from './userSlice';

const User = (props) => {
  const userID = useSelector(selectUsername);
  const authState = useSelector(selectAuthState);
  const { isLoading } = useSelector((state) => state.user);
  const { handleAuth, handleLogout } = props;

  if (isLoading) {
    return (
      <svg className="spinner" viewBox="0 0 50 50" data-testid="loading">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    );
  } else if (authState) {
    return (
      <Fragment>
        <a
          id="reddit-username"
          target="_blank"
          rel="noreferrer"
          href={`https://www.reddit.com/user/${userID}`}
          aria-label="Current user ID"
        >
          {userID}
        </a>
        {/* Here's the ugly logout button you didn't ask for :) */}
        <button id="reddit-logout" aria-label="Logout" onClick={handleLogout}>
          Logut
        </button>
      </Fragment>
    );
  } else {
    return (
      <a id="reddit-username" href="/" onClick={handleAuth} aria-label="Connect the web app with your Reddit account">
        Link with Reddit
      </a>
    );
  }
};

export default User;
