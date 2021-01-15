import React, { Component } from "react"
import Context from "../Context"
import config from "../config"
import TokenService from "../services/token-service"

export default class AddCategory extends Component {
    static contextType = Context

    constructor(props){
        super(props)
        this.state={
            categoryName: {
                name: ' ',
                touched: false
            },
            admin_id: {
                adminId: 1,
                touched: false
            }
        }
    }

    updateCategoryName(categoryName){
        this.setState({
            categoryName:{
                name: categoryName,
                touched: true
            },
            admin_id: {
                adminId: 1,
                touched: true
            }
        })
    }

    handleSubmitCategory = (event) => {
        event.preventDefault()
        const categoryName = this.state.categoryName.value
        const adminId = this.state.adminId.value
        
        fetch(`${config.API_ENDPOINT}/admin/category`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({'name': categoryName, 'adminId': adminId})
        })
        .then(res => res.json())
        .then(data => {
            this.context.addCategory(data)
            this.props.history.push('/')
        })
        .catch(error => console.log(error))
    }

    render() {
        return(
            <div>
                <h2>添加新的剧本人数列表</h2>

                <form onSubmit={e=> this.handleSubmitCategory(e)}>
                    <label htmlFor="name">{this.state.categoryName.touched}</label>
                    <input type="test" name="category-name" onChange={e=>this.updateCategoryName(e.target.value)}></input>
                </form>

                <button type="submit">确认</button>

            </div>
        )
    }
}