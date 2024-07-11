import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Stars from "../components/Stars";
import NotFound from "./NotFound";
import axios from "axios";

function Course() {
  const params = useParams();
  const courseCode = params.id;
  const courseUrl = "http://localhost:8000/api/";

  const [courseTitle, setCourseTitle] = useState("");
  const [courseCodes, setCourseCodes] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [averageEase, setAverageEase] = useState(0);
  const [averagePracticality, setAveragePracticality] = useState(0);
  const [averageEnjoyability, setAverageEnjoyability] = useState(0);
  const [averageOverall, setAverageOverall] = useState(0);

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

        // Gets and sets rating averages

        if (response.data.length !== 0) {
          let totalEase = 0;
          let totalPracticality = 0;
          let totalEnjoyability = 0;
          let totalOverall = 0;

          response.data.forEach((rating) => {
            totalEase += rating.ease_rating;
            totalPracticality += rating.practicality_rating;
            totalEnjoyability += rating.enjoyability_rating;
            totalOverall += rating.overall_rating;
          });
          setAverageEase(Math.round(totalEase / response.data.length));
          setAveragePracticality(
            Math.round(totalPracticality / response.data.length)
          );
          setAverageEnjoyability(
            Math.round(totalEnjoyability / response.data.length)
          );
          setAverageOverall(Math.round(totalOverall / response.data.length));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourseTitle();
    fetchCourseCodes();
    fetchRatings();
  }, []);

  // Checks if URL params are valid

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
              <Stars filled={averageOverall} />
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
