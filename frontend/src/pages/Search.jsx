import Searchbar from "../components/Seachbar";
import SearchResults from "../components/SearchResults";
import { useState } from "react";

function Search() {
  const [results, setResults] = useState([]);

  return (
    <>
      <div className="search-page-container">
        <h2 className="search-page-title">3000+ Courses to Search From!</h2>
        <div className="search-bar-container">
          <Searchbar setResults={setResults} />
          <SearchResults results={results} />
        </div>
      </div>
    </>
  );
}

export default Search;
