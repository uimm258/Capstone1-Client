import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Context from '../Context'
import Navbar from '../Navbar/Navbar'
import config from '../config'
import ScriptListNav from '../ScriptListNav/ScriptListNav'
import ScriptListMain from '../ScriptListMain/ScriptListMain'
import ScriptPageNav from '../ScriptPageNav/ScriptPageNav'
import ScriptPageMain from '../ScriptPageMain/ScriptPageMain'

import './App.css'

class App extends Component {
  state = {
    category: [],
    scripts: [],
  }

  componentDidMount() {
    Promise.all([
        fetch(`${config.API_ENDPOINT}/scripts`),
        fetch(`${config.API_ENDPOINT}/category`)
    ])
        .then(([scritpsRes, categoryRes]) => {
            if (!scritpsRes.ok)
                return scritpsRes.json().then(e => Promise.reject(e));
            if (!categoryRes.ok)
                return categoryRes.json().then(e => Promise.reject(e));

            return Promise.all([scritpsRes.json(), categoryRes.json()]);
        })
        .then(([scripts, category]) => {
            this.setState({scripts, category});
        })
        .catch(error => {
            console.error({error});
        });
}

  renderNavRoutes() {
    return (
      <>
        {["/", "/category/:category_id"].map(path =>(
          <Route
            exact
            key={path}
            path={path}
            component={ScriptListNav}
          />
        ))}
        <Route path='/scripts/:scriptId' component={ScriptPageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path="/" component={Navbar} />
        
        <Route
            exact
            path="/category/:category_id"
            component={ScriptListMain}
          />
        
        <Route path="/scripts/:scriptId" component={ScriptPageMain} />
      </>
    );
  }

  render() {
    const value = {
      category: this.state.category,
      scripts: this.state.scripts
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <nav className="App_nav">
            {this.renderNavRoutes()}
          </nav>

          <header className="App_header">
            <h1>
              <Link to="/">Y-Rspace</Link>
            </h1>
          </header>

          <main className="App_main">
            {this.renderMainRoutes()}
          </main>
        </div>
      </Context.Provider>
    )
  }

}

export default App;