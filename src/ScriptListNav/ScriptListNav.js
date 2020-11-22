/* eslint-disable array-callback-return */
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {countScriptsForCategory} from '../scripts-helpers'
import './ScriptListNav.css'
import Context from '../Context'
import CircleButton from '../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class ScriptListNav extends Component{
    static defaultProps = { 
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = Context

    renderBackButton = () => {
        if(this.props.match.path !== "/"){
            return (<CircleButton
            tag='button'
            role='link'
            onClick = {() => this.props.history.goBack()}
            className='ScriptListNav_back-button' >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
            Back
        </CircleButton>) 
        }
    }

    render() {
        const { category=[], scripts=[] } = this.context
        return (
            <div className="ScriptListNav">
                {this.renderBackButton()}
                <ul className={`ScriptListNav_list ${this.props.match.path==="/" ?" " :"category"}`}>
                    {category.map(category1 => 
                        <li key={category1.id}>
                            <NavLink
                                className='ScriptListNav_category-link'
                                to={`/category/${category1.id}`}
                            >
                                <span className='ScriptListNav_num-scripts'>
                                    {countScriptsForCategory(scripts, parseInt(category1.id))}
                                </span>
                                {category1.category_name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
    
}