import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ScriptPageMain from '../ScriptPageMain/ScriptPageMain'

it('renders without crashing', () => {
    const div = document.createElement('root');
    ReactDOM.render(
        <BrowserRouter>
            <ScriptPageMain />
        </BrowserRouter>,
        div
    );
})
