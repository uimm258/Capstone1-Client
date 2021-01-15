import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context'
import config from '../config'
import './Script.css'
import TokenService from "../services/token-service"
import CircleButton from '../CircleButton/CircleButton'

export default class Script extends Component {
    static contextType = Context

    static defaultProps = {
        onDeleteScript: () => {}
    }

    
    handleClickDelete = (e) => {
        e.preventDefault();
        const scriptId = this.props.id
        fetch(`${config.API_ENDPOINT}/scripts/${scriptId}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer.${TokenService.getAuthToken()}`
            }
        })
            .then((res) => {
                if (!res.ok) return res.json().then((e) => Promise.reject(e));
            })
            .then(() => {
                this.context.deleteScript(scriptId)
                this.props.onDeleteScript(scriptId)
            })
            .catch((error) => {
                console.log({error})
            })
    }

    render() {
        return(
            <div className='Script'>
                <h2 className='Script_title'>
                    <Link to={`/scripts/${this.props.id}`}>{this.props.name}</Link>
                </h2>

                {TokenService.hasAuthToken() && <button className="delete-button" type="button" onClick={this.handleClickDelete}>删除剧本</button>}
    
                <div className='Script_info'>
                    <div className='people'>
                        人数: {' '}
                        <span>
                            {this.props.people}
                        </span>
                    </div>
                    <div className='time'>
                        时长: {' '}
                        <span>
                            {this.props.time_spend}
                        </span>
                    </div>
                    <div className='price'>
                        价格: {' '}
                        <span>
                            {this.props.price}
                        </span>
                    </div>
                    <div className='type'>
                        类型: {' '}
                        <span>
                            {this.props.type}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}