import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Course() {
  const params = useParams();
  const courseCode = params.id;
  const courseUrl = "http://localhost:8000/api/courses/";

  const [courseTitle, setCourseTitle] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await axios.get(courseUrl + courseCode);
      setCourseTitle(response.data[0].course_title);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCourses();

  return (
    <>
      <div className="course-container">
        <h2 className="course-code">{courseCode}</h2>
        <h3 className="course-title">{courseTitle}</h3>
      </div>
      {/* CREATE NEW POSTGRESQL TABLE TO STORE RATINGS */}
      <div className="course-page">
        <div className="course-stats">
          <p className="number-of-ratings">Ratings</p>
          <div className="overall-course-rating">
            <p>Overall Rating:</p>
            <div className="stars-container">
              <span className="stars">&#9733;</span>
              <span className="stars">&#9733;</span>
              <span className="stars">&#9733;</span>
              <span className="stars">&#9733;</span>
              <span className="stars">&#9733;</span>
            </div>
          </div>
          <button className="create-rating-btn">Write a Rating</button>
        </div>

        <div className="course-ratings"></div>
      </div>
    </>
  );
}
export default Course;
