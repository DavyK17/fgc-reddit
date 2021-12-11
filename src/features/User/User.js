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
                  <svg id="reddit-logout" data-testid="reddit-logout" className="lg-only" aria-label="Logout" onClick={handleLogout} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M0 2v20h14v-2h-12v-16h12v-2h-14zm18 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z"/>
                  </svg>
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
