import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context'
import './Script.css'

export default class Script extends Component {
    static contextType = Context

    render() {
        return(
            <div className='Script'>
                <h2 className='Script_title'>
                    <Link to={`/scripts/${this.props.id}`}>{this.props.name}</Link>
                </h2>
    
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