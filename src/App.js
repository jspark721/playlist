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
        <h2>{ Math.round((totalDuration/60)/60) } Hours</h2>
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
            <li>{song.name}</li>
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
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: { 'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise
          .then(response => response.json())
          return trackDataPromise
      })
      let allTracksDataPromises = Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              duration: trackData.duration_ms / 1000
            }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
        playlists: playlists.map(item => {
          console.log(item.trackDatas)
          return {
            name: item.name,
            imageURL: item.images[0].url,
            songs: item.trackDatas.slice(0,5)
          }
        })
      }))
  }
  render() {
    let playlistToRender =
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist => {
        let matchesPlaylist = playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
        let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
          .includes(this.state.filterString.toLowerCase()))
        return matchesPlaylist || matchesSong

      }) : []
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
          : 'https://playlist-backendjp.herokuapp.com/login'}}>
            Login with Spotify
          </button>
        }
      </div>
    );
  }
}

export default App;
