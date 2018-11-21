import React, { Component } from 'react';
import './App.css';


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
        <img className="cover-img" src={playlist.imageURL} alt="playlist image"/>
        <h3 className="playlist-title">{playlist.name}</h3>
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
    let accessToken = new URLSearchParams(window.location.search).get('access_token')

    if(!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => this.setState({
        playlists: data.items.map(item => ({
            name: item.name,
            imageURL: item.images[0].url,
            songs:[]
          }))
      }))
  }
  render() {
    let playlistToRender =
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()))
      : []
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1>Playlists by { this.state.user.name }</h1>

          <PlaylistCounter playlists= { playlistToRender }/>
          <HoursCounter playlists= { playlistToRender } />

          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }
          }/>

          {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
          )}

        </div> : <button onClick={()=> {
          window.location = window.location.href.includes('localhost')
          ? 'http://localhost:8888/login'
          : 'https://react-playlist-app.herokuapp.com/'}}>
            Login with Spotify
          </button>
        }
      </div>
    );
  }
}

export default App;
