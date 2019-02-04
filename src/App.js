import React, { Component } from 'react';
import './App.css';
import HeaderBar from './components/header-bar';
import RegistrationPage from './components/registration-page';
import Users from './components/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar />
        <RegistrationPage />
        <Users />
      </div>
    );
  }
}

export default App;
