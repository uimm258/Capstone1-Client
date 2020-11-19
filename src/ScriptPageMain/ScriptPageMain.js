import React, {Component} from 'react'
import Script from '../Script/Script'
import Context from '../Context'
import {findScript} from '../scripts-helpers'

export default class ScriptPageMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = Context

    render(){
        const {scripts=[]} = this.context
        const {scriptId} = this.props.match.params
        const script = findScript(scripts, scriptId) || { content: ' '}
        return (
            <section className="ScriptPageMain">
                <Script
                    id={scripts.script_id}
                    name={scripts.script_name}
                    time_spend={scripts.time_spend}
                    type={scripts.script_type}
                    price={scripts.script_price}
                />
    
                <div className="ScriptPageMain_content">
                    {script.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }

    
}

