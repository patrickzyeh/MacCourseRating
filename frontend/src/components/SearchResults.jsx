function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((result) => {
        // CHANGE TO THE LINK OF THE RESPECTIVE COURSE PAGE
        return <div>{result.course_code}</div>;
      })}
    </div>
  );
}
export default SearchResults;
