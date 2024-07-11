import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import axios from "axios";

function Course() {
  const params = useParams();
  const courseCode = params.id;
  const courseUrl = "http://localhost:8000/api/";

  const [courseTitle, setCourseTitle] = useState("");
  const [courseCodes, setCourseCodes] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const response = await axios.get(courseUrl + "courses/" + courseCode);
        setCourseTitle(response.data[0].course_title);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCourseCodes = async () => {
      try {
        const response = await axios.get(courseUrl + "courses/");
        let courses = [];
        response.data.forEach((course) => {
          courses.push(course.course_code);
        });
        setCourseCodes(courses);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRatings = async () => {
      try {
        const response = await axios.get(courseUrl + "ratings/" + courseCode);
        setRatings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourseTitle();
    fetchCourseCodes();
    fetchRatings();
  }, []);

  if (courseCodes.includes(courseCode)) {
    return (
      <>
        <div className="course-container">
          <h2 className="course-code">{courseCode}</h2>
          <h3 className="course-title">{courseTitle}</h3>
        </div>
        {/* CREATE NEW POSTGRESQL TABLE TO STORE RATINGS */}
        <div className="course-page">
          <div className="course-stats">
            <p className="number-of-ratings">
              {ratings.length} {ratings.length === 1 ? "Rating" : "Ratings"}
            </p>
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
  } else {
    return <NotFound />;
  }
}
export default Course;
