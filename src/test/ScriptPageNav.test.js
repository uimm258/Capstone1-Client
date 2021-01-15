import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ScriptPageNav from '../ScriptPageNav/ScriptPageNav'

describe('Script List Main', () => {
    it('renders without crashing', () => {
        const div = document.createElement('root');
        ReactDOM.render(
            <BrowserRouter>
                <ScriptPageNav />
            </BrowserRouter>,
            div
        );
    })
})