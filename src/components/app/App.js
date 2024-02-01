import React from "react";
import SearchBar from "../searchbar/SearchBar";
import SearchResults from "../searchresults/SearchResults";
import Playlist from "../playlist/Playlist";
import styles from "./App.module.css"
// import Tracks from './TrackList';
// import SearchBtn from './SearchBtn';
function App() {
  return (
    <div>
      Ja<span className={styles.highlight}>mmm</span>ing
      <h2>A React App for Spotify</h2>
      <div className="App">
      <SearchBar />
        <h2>
        </h2>  
        <div className="App-playlist">
          <SearchResults />
        
          <h2>
          <Playlist />
          </h2>
        <p>

        </p>
        </div>
      
    </div>
    </div>
  );
}
export default App;
