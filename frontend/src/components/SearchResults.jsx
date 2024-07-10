import { Link } from "react-router-dom";

function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((result) => {
        // CHANGE TO THE LINK OF THE RESPECTIVE COURSE PAGE
        return (
          <Link
            className="course-link"
            to={"/ratings/" + result.course_code}
            style={{ textDecoration: "none", color: "black" }}
          >
            {result.course_code}
          </Link>
        );
      })}
    </div>
  );
}
export default SearchResults;
