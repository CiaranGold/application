import React, {useState} from "react";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";
import Playlist from "../playlist/Playlist";
import styles from "./App.module.css"
import {Route, RouterProvider} from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { Spotify } from "../../util/Spotify/Spotify";

const router = createBrowserRouter( /* application routes are defined here */ );


function App() {
  
  const [searchResults,setSearchResults] = useState([]); //use 'SampleSearchResults' for dummy data
  const [playlistName,setPlaylistName] = useState(['Example Playlist Name']);
  const [playlistTracks, setPlaylistTracks] = useState([]
    );

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
      if(existingTrack) {
      console.log("This track has already been added");
      } else {
        setPlaylistTracks(newTrack);
      }
}

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }
 
  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]); 
    }); 
    } 

  function search(term) {
    
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term); 
  } 


  return (
    <div>
      < RouterProvider router={} />
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {<SearchBar onSearch={search} /> }

      <div className={styles["App-playlist"]}>
        <SearchResults userSearchResults={searchResults} onAdd={addTrack} />

        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          />

      </div>
      </div>
    </div>
  )
  }



export default App;
