import React from 'react';
import styles from "./SearchResults.module.css"
import TrackList from "../tracklist/TrackList"

function SearchResults(props){
    return ( 
    <div className={styles.SearchResults}>
      <TrackList
        userSearchResults={props.userSearchResults}
        isRemoval={false}
        onAdd={props.onAdd}
        />
  
        </div> 
        );
} 
export default SearchResults;


/* function SearchResults(props) {
    return (
      <div className={styles.SearchResults}> */


        {/* <!-- Add a Tracklist component --> */}
   /*      <Tracklist
          userSearchResults={props.userSearchResults}
          isRemoval={false}
          onAdd={props.onAdd}
        />
      </div>
    );
  } */