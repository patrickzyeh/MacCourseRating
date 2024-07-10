import { useParams } from "react-router-dom";
import axios from "axios";

function Course() {
  const params = useParams();
  const courseCode = params.id;

  const courseUrl = "http://localhost:8000/api/courses/";

  const fetchCourseTitle = async (value) => {
    try {
      const response = await axios.get(courseUrl + courseCode);
      const courseTitle = response.data[0].course_title;
      return courseTitle;
    } catch (err) {
      console.log(err);
    }
  };

  const courseTitle = fetchCourseTitle();
  console.log(typeof courseTitle);

  return (
    <div className="course-container">
      <h2 className="course-code">{courseCode}</h2>
      <h3 className="course-title"></h3>
    </div>
  );
}
export default Course;
