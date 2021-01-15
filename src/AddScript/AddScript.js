import React, { Component } from 'react'
import Context from "../Context"
import config from "../config"
import TokenService from "../services/token-service"

export default class AddScript extends Component {
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
            }
        }
    }

    updateScript(scriptName, people, time, price, type, image, content) {
        this.setState({
            scriptName: {
                value: scriptName,
                touched: true,
            },
            people: {
                value: people,
                touched: true,
            },
            time: {
                value: time,
                touched: true,
            },
            price: {
                value: price,
                touched: true,
            },
            type: {
                value: type,
                touched: true,
            },
            image: {
                value: image,
                touched: true,
            },
            content: {
                value: content,
                touched: true,
            }
        })
    }

    handleSubmitScript = (event) => {
        event.preventDefault()
        const scriptName = this.state.scriptName
        const people = this.state.people
        const time = this.state.time
        const price = this.state.price
        const image = this.state.image
        const content = this.state.content
        const category_id = event.currentTarget.querySelector("select").value;
        const admin_id = 1

        fetch(`${config.API_ENDPOINT}/admin/scripts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                'name': scriptName,
                'people': people,
                'time': time,
                'price': price,
                'image': image,
                'content': content,
                'category_id': category_id,
                'admin_id': admin_id
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.context.addScript(data);
                this.props.history.push("/");
            })
            .catch((error) => console.log(error));
    }

    CategoryOption = () => {
        const { category } = this.context;
        return category.map((category1) => {
            <option key={category1.id} name={category1.id} value={category1.id}>
                {category1.name}
            </option>
        })
    }

    render() {
        return (
            <div>
                <h2>添加新的剧本</h2>

                <form onSubmit={e => this.handleSubmitScript(e)}>
                    <label htmlFor="name">
                        剧本名字: {this.state.scriptName.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateScript(e.target.value)} required />
                    <br></br>

                    <label htmlFor="people">
                        人数: {this.state.people.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateScript(e.target.value)} required />
                    <br></br>

                    <label htmlFor="time">
                        时长: {this.state.time.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateScript(e.target.value)} required />
                    <br></br>

                    <label htmlFor="price">
                        价格: {this.state.price.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateScript(e.target.value)} required />
                    <br></br>

                    <label htmlFor="image">
                        图片: {this.state.image.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateScript(e.target.value)}/>
                    <br></br>

                    <label htmlFor="content">
                        内容: {this.state.content.touched}
                    </label>
                    <input type="text" onChange={(e) => this.updateScript(e.target.value)}/>
                    <br></br>

                    <p>选择几人本
                    <select>{this.CategoryOption()}</select>
                    </p>
                    <br></br>

                    <button type="submit">确认</button>

                </form>            
            </div>
        )
    }

}