import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Context from '../Context'
import Navbar from '../Navbar/Navbar'
import config from '../config'
import ScriptListNav from '../ScriptListNav/ScriptListNav'
import ScriptListMain from '../ScriptListMain/ScriptListMain'
import ScriptPageNav from '../ScriptPageNav/ScriptPageNav'
import ScriptPageMain from '../ScriptPageMain/ScriptPageMain'
import logo from './logo.JPG'
import LoginRoute from '../Login/LoginRoute'
import AddCategory from '../AddCategory/AddCategory'
import AddScript from '../AddScript/AddScript'
import './App.css'
import EditScript from '../EditScript/EditScript'

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
        .then(([scriptsRes, categoryRes]) => {
            if (!scriptsRes.ok)
                return scriptsRes.json().then(e => Promise.reject(e));
            if (!categoryRes.ok)
                return categoryRes.json().then(e => Promise.reject(e));

            return Promise.all([scriptsRes.json(), categoryRes.json()]);
        })
        .then(([scripts, category]) => {
            this.setState({scripts, category});
        })
        .catch(error => {
            console.error({error});
        });
}

  handleAddCategory = category1 => {
    this.setState({
      category: [...this.state.category, category1]
    }
  )}

  handleAddScript = script => {
    this.setState({
      scripts: [...this.state.scripts, script]
    })
  }

  handleEditScript = script => {
    this.setState({
      scripts: [...this.state.scripts, script]
    })
  }

  handleDeleteScript = scriptId => {
    this.setState({
      scripts: this.state.scripts.filter(script => script.id !== scriptId)
    })
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
        <Route path='/add-category' component={ScriptPageNav} />
        <Route path='/add-script' component={ScriptPageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Route exact path="/" component={Navbar} />
        <Route path={'/login'} component={LoginRoute} />
        
        <Route
            exact
            path="/category/:category_id"
            component={ScriptListMain}
          />
        
        <Route path="/scripts/:scriptId" component={ScriptPageMain} />
        <Route path='/add-category' component={AddCategory} />
        <Route path='/add-script' component={AddScript} />
        <Route path='/:scriptId/edit-script' component={EditScript} />
      </>
    );
  }

  render() {
    const value = {
      category: this.state.category,
      scripts: this.state.scripts,
      addCategory: this.handleAddCategory,
      addScript: this.handleAddScript,
      editScript: this.handleEditScript,
      deleteScript: this.handleDeleteScript
    };

    return (
      <Context.Provider value={value}>
        <div className="App">
          <nav className="App_nav">
            {this.renderNavRoutes()}
          </nav>

          <header className="App_header">
            <img src={logo} alt="Logo" align="left"/>
            <h1>
              <Link to="/"> Y-Rspace 剧本杀桌游店</Link>
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