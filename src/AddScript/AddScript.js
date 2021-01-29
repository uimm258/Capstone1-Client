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


    handleSubmitScript = (event) => {
        event.preventDefault()
        const scriptName = this.state.scriptName
        const people = this.state.people
        const time = this.state.time
        const price = this.state.price
        const type = this.state.type
        const image = this.state.image
        const content = this.state.content
        const category_id = event.currentTarget.querySelector("select").value;

        fetch(`${config.API_ENDPOINT}/admin/scripts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                'scripts_name': scriptName.value,
                'people': people.value,
                'time_spend': time.value,
                'scripts_price': price.value,
                'scripts_image': image.value,
                'content': content.value,
                'category_id': category_id,
                'scripts_type': type.value
                // 'admin_id': admin_id
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
        return category.map((category1) =>
            <option id="category_name" key={category1.id} name={category1.id} value={category1.id}>
                {category1.category_name}
            </option>
        )
    }

    render() {
        return (
            <div>
                <h2>添加新的剧本</h2>

                <form onSubmit={e => this.handleSubmitScript(e)}>
                    <label for="script_name">
                        剧本名字: {this.state.scriptName.touched}

                        <input id="script_name" type="text" onChange={(e) => this.updateName(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="people">
                        人数: {this.state.people.touched}

                        <input id="people" type="text" onChange={(e) => this.updatePeople(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="time">
                        时长: {this.state.time.touched}

                        <input id="time" type="text" onChange={(e) => this.updateTime(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="price">
                        价格: {this.state.price.touched}

                        <input id="price" type="text" onChange={(e) => this.updatePrice(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="type">
                        类型: {this.state.type.touched}

                        <input id="type" type="text" onChange={(e) => this.updateType(e.target.value)} required />
                    </label>
                    <br></br>

                    <label for="image">
                        图片: {this.state.image.touched}

                        <input id="image" type="text" onChange={(e) => this.updateImage(e.target.value)} />
                    </label>
                    <br></br>

                    <label for="content">
                        内容: {this.state.content.touched}

                        <input id="content" type="text" onChange={(e) => this.updateContent(e.target.value)} />
                    </label>
                    <br></br>

                    <p>选择几人本
                    <select for="category_name">{this.CategoryOption()}</select>
                    </p>
                    <br></br>

                    <button type="submit">确认</button>

                </form>
            </div>
        )
    }

}