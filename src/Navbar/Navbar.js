import React, { Component } from 'react';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './Navbar.css';
import Rules from './Rules';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="Navbar">
          <ul id="nav">
            <li><a href="#AboutUs">关于我们</a></li>
            <li><a href="#Rules">剧本杀须知</a></li>
            <li><a href="#ContactUs">联系我们</a></li>
            <li><Link to="/login">管理者登录</Link></li>
          </ul>
        </div>

        <section className="Navbar_info">
          <div id="AboutUs">
            <h1>关于我们：</h1>
            <AboutUs />
          </div>
          <br />
          <div id="Rules">
            <h1>剧本杀须知：</h1>
            <Rules />
          </div>
          <br />
          <div id="ContactUs">
            <h1>联系我们：</h1>
            <ContactUs />
          </div>
        </section>
      </div>
    );
  }
}