import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Header } from './Header';

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
        </Switch>
      </div>
    </BrowserRouter>
  );
};
