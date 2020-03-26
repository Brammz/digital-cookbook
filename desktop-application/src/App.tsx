import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.registerKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerKeydown);
  }

  registerKeydown(e: KeyboardEvent) {
    if (e.code === 'F12') ipcRenderer.send('keydown', 'F12');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
