//import logo from './f';
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../PlayList/PlayList.js";

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [{name: "name1",artist:'artis1',album:'album1',id:1},
      {name: "name2",artist:'artis2',album:'album2',id:2},
      {name: "name3",artist:'artis3',album:'album13',id:3}],
      playlistName:'My PlayList',
      playlistTracks:[{name: "PlayListname4",artist:'artis4',album:'album4',id:4},
      {name: "PlayListnname5",artist:'artis5',album:'album5',id:5},
      {name: "PlayListnname6",artist:'artis6',album:'album6',id:6}]
     };
    this.addTrack = this.addTrack.bind(this);
    
   

  }
  addTrack(track){
    let tracks=this.state.playlistTracks;
    if(tracks.find(savedTrack=> savedTrack.id ===track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks:tracks});
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar />
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component -->
              <!-- Add a Playlist component --> */}

            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
