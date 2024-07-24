import { useState } from "react";
import Searchbar from "../components/Seachbar";
import SearchResults from "../components/SearchResults";

function Home() {
  const [results, setResults] = useState([]);

  return (
    <>
      <div className="home-page">
        <h1 id="home-title">McMaster Course Ratings</h1>
        <h2 id="title-description">
          Course Ratings to Elevate Your McMaster Experience
        </h2>
        <div className="search-bar-container">
          <Searchbar setResults={setResults} />
          <SearchResults results={results} />
        </div>
      </div>
    </>
  );
}

export default Home;
