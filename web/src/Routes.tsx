import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/homePage/Home';
import { About } from './pages/aboutPage/About';
import { Register } from './pages/registerPage/Register';
import { LoginPage } from './pages/loginPage/Login';
import { Admin } from './pages/adminPage/Admin';
import { Users } from './pages/usersPage/Users';
import { UserProfile } from './pages/userProfilePage/UserProfile';
import { Posts } from './pages/postsPage/Posts';
import { PageNotFound } from './pages/errorPages/PageNotFound';

// Error pages
import { NoUser } from './pages/errorPages/NoUser';
import { NoPass } from './pages/errorPages/NoPass';

// Components
import Header from './components/header/Header';

export const Routes: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
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
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/nouser" component={NoUser} />
        <Route exact path="/nopass" component={NoPass} />
        <Route exact path="/404" component={PageNotFound} />
      </Switch>
    </div>
  );
};
