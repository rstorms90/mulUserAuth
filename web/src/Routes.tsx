import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/homePage/Home';
import { About } from './pages/aboutPage/About';
import { Register } from './pages/registerPage/Register';
import { LoginPage } from './pages/loginPage/Login';
import { CreatePost } from './pages/createPostPage/CreatePost';
import { Users } from './pages/usersPage/Users';
import { UserProfile } from './pages/userProfilePage/UserProfile';
import { Posts } from './pages/postsPage/Posts';
import { PostPage } from './pages/postPage/PostPage';
import { PageNotFound } from './pages/errorPages/PageNotFound';
import { useTransition, animated } from 'react-spring';

// Error pages
import { NoUser } from './pages/errorPages/NoUser';
import { NoPass } from './pages/errorPages/NoPass';

// Components
import Header from './components/header/Header';

// Styles
import './theme.css';

export const Routes: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      <Header />
      {transitions.map(({ item: location, props, key }) => (
        <animated.div
          className="animated-page-container"
          key={key}
          style={props}
        >
          {console.log(props)}
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:user"
              render={(props) => <UserProfile {...props} />}
            />
            <Route
              exact
              path="/user/:user/:id/posts"
              render={(props) => <Posts {...props} />}
            />
            <Route
              exact
              path="/user/:user/:id/posts/:id"
              render={(props) => <PostPage {...props} />}
            />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/createpost" component={CreatePost} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/nouser" component={NoUser} />
            <Route exact path="/nopass" component={NoPass} />
            <Route exact path="/404" component={PageNotFound} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
};
