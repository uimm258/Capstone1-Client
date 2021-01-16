import React, {Component} from 'react'
import Script from '../Script/Script'
import Context from '../Context'
import {findScript} from '../scripts-helpers'
import './ScriptPageMain.css'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'
import CircleButton from '../CircleButton/CircleButton'

export default class ScriptPageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = Context

    handleEditScript = script => {
        this.context.editScript = script;
        console.log(script)
        this.props.history.push(`/${script.id}/edit-script`)
        // this.setState({
        //     scripts: [...this.state.scripts, script]
        // })
    }

    handleDeleteScript = scriptId => {
        this.props.history.push(`/`)
    }

    render(){
        const {scripts=[]} = this.context
        const {scriptId} = this.props.match.params
        const script = findScript(scripts, parseInt(scriptId)) || {content: ''}

        return (
            <section className="ScriptPageMain">

                <Script
                    id={script.id}
                    name={script.scripts_name}
                    people={script.people}
                    time_spend={script.time_spend}
                    type={script.scripts_type}
                    price={script.scripts_price}
                    onEditScript={this.handleEditScript}
                    onDeleteScript={this.handleDeleteScript}
                />
    
                <div className="ScriptPageMain_image">
                    <img src={`${script.scripts_image}`} alt="暂无图片" />
                </div>
                <div className="ScriptPageMain_content">
                    {script.content.split(/\\n \\r|\\n/).map((para, i) =><p key={i}>{para}</p>
                    )}
                </div>

                {TokenService.hasAuthToken() && <button onClick={()=>this.handleEditScript(script)}>修改剧本</button>}

            </section>
        )
    }

    
}

