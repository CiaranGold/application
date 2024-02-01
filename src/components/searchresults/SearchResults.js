import React from 'react';
import styles from "./SearchResults.module.css"
//import TrackList from "../app/Tracklist"

const SearchResults = (props) => {
    return ( <div className={styles.SearchResults}>
        <h4>Search results:</h4>
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