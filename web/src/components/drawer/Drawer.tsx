import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Drawer, List, ListItem } from '@material-ui/core';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

import { useLogoutMutation } from '../../generated/graphql';

import { setAccessToken } from '../../accessToken';

interface Props {
  currentUser: any;
}

const DrawerSideNav: React.FC<Props> = ({ currentUser }) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (side: any, open: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({
      ...state,
      [side]: open,
    });
  };

  const [logout, { client }] = useLogoutMutation();
  let history = useHistory();

  return (
    <div className="Drawer">
      <button onClick={toggleDrawer('right', !state.right)}>
        Profile Sidebar
      </button>
      <Drawer
        open={state.right}
        onClose={toggleDrawer('right', false)}
        anchor="right"
      >
        <div
          className={'drawer'}
          role="presentation"
          onClick={toggleDrawer('right', false)}
          onKeyDown={toggleDrawer('right', false)}
        >
          <List>
            <ListItem>
              <div className="loggedInInfo">
                Logged in as:
                <span className="loggedInUsername">
                  {currentUser?.username}
                </span>
              </div>
            </ListItem>
            <ListItem>
              <Link
                to={{ pathname: `/user/${currentUser?.username}` }}
                className="commonBtn"
              >
                My Profile
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={{
                  pathname: `/user/${currentUser?.username}/${currentUser?.id}/posts`,
                }}
                className="commonBtn"
              >
                My posts
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/createpost" className="commonBtn">
                Create Post
              </Link>
            </ListItem>
            <ListItem>
              <ThemeSwitcher />
            </ListItem>
            <ListItem>
              <div className="logout-btn-container">
                <button
                  className="commonBtn"
                  onClick={async () => {
                    await logout();
                    history.push('/');
                    setAccessToken('');
                    await client!.resetStore();
                  }}
                >
                  Logout
                </button>
              </div>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerSideNav;
