import React, { Component } from 'react'
import Context from "../Context"
import config from "../config"
import TokenService from "../services/token-service"

export default class EditScript extends Component {
    static contextType = Context;

    constructor(props) {
        super(props)
        this.state = {
            scriptName: {
                value: ' ',
                touched: false,
            },
            people: {
                value: ' ',
                touched: false,
            },
            time: {
                value: ' ',
                touched: false,
            },
            price: {
                value: ' ',
                touched: false,
            },
            type: {
                value: ' ',
                touched: false,
            },
            image: {
                value: ' ',
                touched: false,
            },
            content: {
                value: ' ',
                touched: false,
            },
            category_id: {
                value: ' ',
                touched: false,
            }
        }
    }

    componentDidMount() {
        this.setState({
            scriptName: {
                value: this.context.editScript.scripts_name
            },
            people: {
                value: this.context.editScript.people
            },
            time: {
                value: this.context.editScript.time_spend
            },
            price: {
                value: this.context.editScript.scripts_price
            },
            type: {
                value: this.context.editScript.scripts_type
            },
            image: {
                value: this.context.editScript.scripts_image
            },
            content: {
                value: this.context.editScript.content
            },
            category_id: {
                value: this.context.editScript.category_id
            }
        })
    }

    updateName(scriptName) {
        this.setState({
            scriptName: {
                value: scriptName,
                touched: true,
            }
        })
    }

    updatePeople(people) {
        this.setState({
            people: {
                value: people,
                touched: true,
            }
        })
    }

    updateTime(time) {
        this.setState({
            time: {
                value: time,
                touched: true,
            }
        })
    }

    updatePrice(price) {
        this.setState({
            price: {
                value: price,
                touched: true,
            }
        })
    }

    updateType(type) {
        this.setState({
            type: {
                value: type,
                touched: true,
            }
        })
    }

    updateImage(image) {
        this.setState({
            image: {
                value: image,
                touched: true,
            }
        })
    }

    updateContent(content) {
        this.setState({
            content: {
                value: content,
                touched: true,
            }
        })
    }

    handleEditScript = (e) => {
        e.preventDefault();
        const scriptName = this.state.scriptName
        const { scriptId } = this.props.match.params
        const people = this.state.people
        const time = this.state.time
        const price = this.state.price
        const type = this.state.type
        const image = this.state.image
        const content = this.state.content
        const category_id = this.state.category_id

        fetch(`${config.API_ENDPOINT}/admin/scripts/${scriptId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                'scripts_name': scriptName.value,
                'people': people.value,
                'time_spend': time.value,
                'scripts_price': price.value,
                'scripts_type': type.value,
                'scripts_image': image.value,
                'content': content.value,
                'category_id': category_id.value
            })
        })
            //.then((res) => console.log(res.json()))
            .then(() => {
                /*this.context.scripts[this.context.editScript.id-1] = {
                    'admin': 1, 
                    'category_id': this.state.category_id.value, 
                    'content': this.state.content.value,
                    'id': this.context.editScript.id,
                    'people': this.state.people.value,
                    'scripts_image': this.state.image.value,
                    'scripts_name':  this.state.scriptName.value,
                    'scripts_price': this.state.price.value,
                    'scripts_type':  this.state.type.value,
                    'time_spend':  this.state.time.value
                  }*/
                //this.context.editScript(data)
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log({ error })
            })
    }

    CategoryOption = () => {
        const { category } = this.context;
        return category.map((category1) =>
            <option key={category1.id} name={category1.id} value={category1.id}>
                {category1.category_name}
            </option>
        )
    }

    render() {
        console.log(this.state.scriptName.value)
        return (
            <div className="edit-script">
                <h2>修改剧本</h2>

                <form onSubmit={e => this.handleEditScript(e)}>
                    <label htmlFor="name">
                        剧本名字: {this.state.scriptName.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateName(e.target.value)} value={this.state.scriptName.value} required />
                    <br></br>

                    <label htmlFor="people">
                        人数: {this.state.people.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updatePeople(e.target.value)} value={this.state.people.value} required />
                    <br></br>

                    <label htmlFor="time">
                        时长: {this.state.time.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateTime(e.target.value)} value={this.state.time.value} required />
                    <br></br>

                    <label htmlFor="price">
                        价格: {this.state.price.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updatePrice(e.target.value)} value={this.state.price.value} required />
                    <br></br>

                    <label htmlFor="type">
                        类型: {this.state.type.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateType(e.target.value)} value={this.state.type.value} required />
                    <br></br>

                    <label htmlFor="image">
                        图片: {this.state.image.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateImage(e.target.value)} value={this.state.image.value} />
                    <br></br>

                    <label htmlFor="content">
                        内容: {this.state.content.touched}
                    </label>
                    <textarea rows="10" cols="50" onChange={(e) => this.updateContent(e.target.value)} value={this.state.content.value} />
                    <br></br>

                    <p>选择几人本
                    <select>{this.CategoryOption()}</select>
                    </p>

                    <button type="submit">确认</button>

                </form>
            </div>
        )
    }
}