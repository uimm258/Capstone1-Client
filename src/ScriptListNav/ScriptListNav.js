import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {countScriptsForCategory} from '../scripts-helpers'
import './ScriptListNav.css'
import Context from '../Context'


export default class ScriptListNav extends Component{
    static contextType = Context

    render() {
        const { category=[], scripts=[] } = this.context
        return (
            <div className='ScriptListNav'>
                <ul className='ScriptListNav_List'>
                    {category.map(category => {
                        <li key={category.id}>
                            <NavLink
                                clasName='ScriptListNav_category-link'
                                to={`/category/${category.id}`}
                            >
                                <span className='ScriptListNav_num-scripts'>
                                    {countScriptsForCategory(scripts, category.id)}
                                </span>
                                {category.category_name}
                            </NavLink>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
    
}