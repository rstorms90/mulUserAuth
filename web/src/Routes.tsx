import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/registerPage/Register';
import { Login } from './pages/loginPage/Login';
import { Admin } from './pages/Admin';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Header } from './components/header/Header';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/protectedRoute" component={ProtectedRoute} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
