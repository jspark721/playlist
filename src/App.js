import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#FFFFFF';
let defaultStyle = {
  color: defaultTextColor
}

class Aggregate extends Component {
  render() {
    return(
      <div style={{width: '40%', display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
        <img/>
        <input type="text" />
        <span style={ defaultStyle }> Filter</span>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
          <li>Song 4</li>
          <li>Song 5</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    let name = 'Julie'
    return (
      <div className="App">
        <h1>Playlist by {name}</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
