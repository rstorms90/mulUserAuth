import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/registerPage/Register';
import { Login } from './pages/loginPage/Login';
import { Admin } from './pages/Admin';
import { Forum } from './pages/Forum';

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
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/nouser" component={NoUser} />
        <Route exact path="/nopass" component={NoPass} />
      </Switch>
    </div>
  );
};
