import React, { Component } from 'react'
import Script from '../Script/Script'
import Context from '../Context'
import { getScriptsForCategory } from '../scripts-helpers'
import './ScriptListMain.css'
import CircleButton from '../CircleButton/CircleButton'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import config from '../config'

export default class ScriptListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = Context

  handleDeleteCategory = (e) => {
    e.preventDefault()
    const categoryId = Object.values(this.props.match.params)
    fetch(`${config.API_ENDPOINT}/admin/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        this.context.deleteCategory(categoryId)
      })
      .catch((e) => console.log(e))
  }

  onClickEffect = () => {
    this.handleDeleteCategory()
    window.location.href='/'
  }

  render() {
    const { category_id } = this.props.match.params
    const { scripts = [] } = this.context
    const scriptsForCategory = getScriptsForCategory(scripts, parseInt(category_id))

    return (
      <section className='ScriptListMain'>
        <ul>
          {scriptsForCategory.map(script =>
            <li key={script.id}>
              <Script
                id={script.id}
                name={script.scripts_name}
                people={script.people}
                time_spend={script.time_spend}
                price={script.scripts_price}
                type={script.scripts_type}
              />
            </li>
          )}
        </ul>

        <div>
          {TokenService.hasAuthToken() && <CircleButton
            tag={Link}
            to='/add-script'
            type='button'
            className="add-script-button">
            <br />
            添加新的剧本
          </CircleButton>}
        </div>

        {TokenService.hasAuthToken() && <button onClick={this.onClickEffect}>Delete the Current Category</button>}
      </section>
    )
  }
}

