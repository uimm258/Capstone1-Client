import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
      div
    );
  });
});
