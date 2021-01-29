import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddScript from '../AddScript/AddScript';

it('renders App component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddScript />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});