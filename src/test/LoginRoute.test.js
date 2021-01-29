import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginRoute from '../Login/LoginRoute';

it('renders App component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LoginRoute />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});