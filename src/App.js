import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#FFFFFF'
}
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
          { title: 'Without Me', duration: 50431},
          { title: 'Nice For What', duration: 30401}
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
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{width: '40%', display: 'inline-block'}}>
        <h2>{ Math.round((totalDuration/ (1000*60)) % 60) } Hours</h2>
      </div>
    );
  }
}


class Filter extends Component {
  render() {
    return(
      <div className="filter-box">
        <img/>
        <h3>Filter</h3>
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return(
      <div className="playlist-box">
        <h3>{playlist.name}</h3>
        <ul>
          { playlist.songs.map(song =>
            <li>{song.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount(){
  }
  render() {
    let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
      ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1>Playlists by { this.state.serverData.user.name }</h1>

          <PlaylistCounter playlists= { this.state.serverData.user.playlists }/>
          <HoursCounter playlists= { this.state.serverData.user.playlists } />

          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }
          }/>

          {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
          )}

        </div> : <button>Login with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
