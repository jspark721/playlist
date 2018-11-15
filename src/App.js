import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#FFFFFF'
};
let fakeServerData = {
  user: {
    name: 'Julie',
    playlists: [
      {
        name: 'My Favorites',
        songs: [
          { title:'Fire', duration: 13560 },
          { title: 'Here', duration: 20000 },
          { title: 'Walk Away', duration: 70000 },
          { title: 'Mine', duration: 50431},
          { title: 'Be Somebody', duration: 12048 }
        ]
      },
      {
        name: 'Top Hits',
        songs: [
          { title:'Happier', duration: 13560 },
          { title: 'Taki Taki', duration: 20000 },
          { title: 'thank u, next', duration: 70000},
          { title: 'Without Me', duration: 50431}
        ]
      },
      {
        name: 'Chill Music',
        songs: [
          { title:'Stuck', duration: 13560 },
          { title: 'The Reason', duration: 20000 },
          { title: 'East Side', duration: 70000 },
          { title: 'Sleepless Nights', duration: 50431},
          { title: 'Location', duration: 12048 }
        ]
      },
      {
        name: 'Tropical Vibes',
        songs: [
          { title:'Fire', duration: 13560 },
          { title: 'Here', duration: 20000 },
          { title: 'Walk Away', duration: 70000 },
          { title: 'Mine', duration: 50431 },
          { title: 'Be Somebody', duration: 12048 }
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{width: '40%', display: 'inline-block'}}>
        <h2>{ this.props.playlists.length } Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])

    return(
      <div style={{width: '40%', display: 'inline-block'}}>
        <h2>{ allSongs.length } Hours</h2>
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
        <h3>Playlist</h3>
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
  constructor() {
    super();
    this.state = { serverData: {}}
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let name = 'Julie'
    return (
      <div className="App">
        { this.state.serverData.user ?
        <div>
          <h1>Playlists by { this.state.serverData.user.name }</h1>

          <PlaylistCounter playlists= { this.state.serverData.user.playlists }/>
          <HoursCounter />

          <Filter />

          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
