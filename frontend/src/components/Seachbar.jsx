import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

function Searchbar({ setResults }) {
  const [searchInput, setSearchInput] = useState("");

  const courseUrl =
    "https://course-ratings-backend-4cc685a03b26.herokuapp.com/api/courses";

  // IMPLEMENT FETCHING RESULTS
  const fetchCourses = async (value) => {
    try {
      const response = await axios.get(courseUrl);
      const courses = response.data;

      // Filter courses

      const matchingCourseCode = courses.filter((course) =>
        course.course_code.toLowerCase().includes(value.toLowerCase())
      );

      setResults(matchingCourseCode);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (value) => {
    setSearchInput(value);
    fetchCourses(value);
  };

  return (
    <div className="search-container">
      <FaSearch id="search-bar-icon" />
      <input
        className="search-input"
        placeholder="Search for course by code"
        onChange={(e) => handleChange(e.target.value)}
        value={searchInput}
      />
    </div>
  );
}
export default Searchbar;
