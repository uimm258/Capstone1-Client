import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ScriptListMain from '../ScriptListMain/ScriptListMain'

describe('Script List Main', () => {
    it('renders without crashing', () => {
        const div = document.createElement('root');
        ReactDOM.render(
            <BrowserRouter>
                <ScriptListMain />
            </BrowserRouter>,
            div
        );
    })
})