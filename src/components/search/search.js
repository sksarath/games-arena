import React from 'react';
import './search.css';

const Search = (props) =>{
  const searchInput = (e) => {
    console.log(e.target.value);
    props.query(e.target.value);
  }
  return(
    <div className="search-container max-width">
      <div className="search-wrapper">
        <input type="text" placeholder="Enter Game Name" className="search-input" onChange={searchInput}/>
      </div>
    </div>
  )
}
export default Search;