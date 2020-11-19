import React, {Component} from 'react'
import Script from '../Script/Script'
import Context from '../Context'
import {getScriptsForCategory} from '../scripts-helpers'
import './ScriptListMain.css'

export default class ScriptListMain extends Component {
  static defaultProps={
    match: {
      params: { }
    }
  }

  static contextType = Context

  render(){
    const {CategoryId} = this.props.match.params
    const {scripts=[]} = this.context
    const scriptsForCategory = getScriptsForCategory(scripts, CategoryId)

    return (
      <section className='scriptListMain'>
        <ul>
          {scriptsForCategory.map(script =>
            <li key={script.id}>
              <Script
                id={script.id}
                name={script.script_name}
                people={script.people}
                time_spend={script.time_spend}
                price={script.scripts_price}
                type={script.scripts_type}
              />
            </li>
          )}
        </ul>
      </section>
    )
  }


}
  
