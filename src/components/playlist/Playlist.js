import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../tracklist/TrackList';

function Playlist(props) {
    // Function to handle changes in the playlist name
    function handleNameChange({ target }) {
        // Call the onNameChange prop with the new name from the input
        props.onNameChange(target.value);
    }

    return (
        <div className={styles.Playlist}>
            {/* Input for editing the playlist name with a default value */}
            <input defaultValue={"New Playlist"} onChange={handleNameChange} />

            {/* Tracklist component for displaying playlist tracks */}
            <Tracklist
                userSearchResults={props.playlistTracks} // Pass playlist tracks as prop
                onRemove={props.onRemove} // Pass onRemove function as prop
                isRemoval={true} // Indicate that it's for removal
            />

            {/* Button for saving the playlist to Spotify */}
            <button className={styles["Playlist-save"]} onClick={props.onSave}>
                Save to Spotify
            </button>
        </div>
    );
}

export default Playlist;
