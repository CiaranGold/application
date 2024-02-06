import React from 'react';
import styles from './Tracklist.module.css'
import Track from '../track/Track';




function TrackList(props) { 
  return (
    <div className={styles.Tracklist}>
      {props.userSearchResults.map((track) => (
        <Track
          track={track}
          key={track.id}
          isRemoval={props.isRemoval}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
        />
      ))}
    </div>
  )
}

export default TrackList;