import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App';
import { BrowserRouter } from 'react-router-dom';

it('renders App component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
