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
      <div className="course-page"></div>
    </>
  );
}
export default Course;
