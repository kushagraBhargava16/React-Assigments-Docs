import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'


class App extends Component {
  //Extra code will be here
  state = {
    user: {
      name: 'Kush',
      age: 26
    }
  };

  nameChangeHandler = name => {
    this.setState({
      user: {
        name: name,
        age: 26
      }
    });
  }

  inputChangeHandler = nameChangeEvent => {
    this.setState({
      user: {
        name: nameChangeEvent.target.value,
        age: 26
      }
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput name={this.state.user.name} change={this.inputChangeHandler} />
        
        <UserOutput name={this.state.user.name} />
        <UserOutput name={this.state.user.name} />
        <UserOutput name='Max' />

      </div>
    );
  }
}

export default App;
