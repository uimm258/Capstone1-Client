import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Context from '../Context'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import config from '../config'
import ScriptListNav from '../ScriptListNav/ScriptListNav'
import ScriptListMain from '../ScriptListMain/ScriptListMain'
import ScriptPageNav from '../ScriptPageNav/ScriptPageNav'
import ScriptPageMain from '../ScriptPageMain/ScriptPageMain'

class App extends Component {
  state = {
    category: [],
    scripts: [],
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/category`),
      fetch(`${config.API_ENDPOINT}/scripts`)
    ])
      .then(([scriptsRes, categoryRes]) => {
        if (!scriptsRes.ok)
          return scriptsRes.json().then(e => Promise.reject(e))
        if (!categoryRes.ok)
          return categoryRes.json().then(e => Promise.reject(e))

        return Promise.all([
          scriptsRes.json(),
          categoryRes.json(),
        ])
      })
      .then(([scripts, category]) => {
        this.setState({ scripts, category })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/category/:categoryId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={ScriptListNav}
          />
        )}
        <Route
          path='/scripts/:scriptsId'
          component={ScriptPageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>

        {['/', '/category/:categoryId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={ScriptListMain}
          />
        ))}
        <Route path="/script/:scriptId" component={ScriptPageMain} />
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
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <Header />
          <Navbar />
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </Context.Provider>
    )
  }

}

export default App;