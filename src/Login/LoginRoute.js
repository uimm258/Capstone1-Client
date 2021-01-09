import React, { Component } from 'react';
import LoginForm from './LoginForm';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    console.log(history)
    history.push("/");
  };

  render() {
    return (
      <section className='LoginRoute'>
        <h2 className='login'>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </section>
    );
  }
}

export default LoginRoute;
