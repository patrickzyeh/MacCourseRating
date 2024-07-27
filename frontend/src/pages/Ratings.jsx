import RatingBlocks from "../components/RatingBlocks";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Ratings() {
  const [mostRatings, setMostRatings] = useState([]);
  const [recentRatings, setRecentRatings] = useState([]);

  useEffect(() => {
    const fetchMostRatings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/ratings/top"
        );
        setMostRatings(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRecentRatings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/ratings/recent"
        );
        setRecentRatings(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMostRatings();
    fetchRecentRatings();
  }, []);

  return (
    <div className="main-rating-page-container">
      <h2>Most Popular Ratings</h2>
      <div className="most-rating-container">
        {mostRatings.map((ratings) => {
          return (
            <RatingBlocks
              key={ratings.course_code}
              courseCode={ratings.course_code}
            />
          );
        })}
      </div>
      <h2>Most Recent Ratings</h2>
      <div className="most-rating-container">
        {recentRatings.map((ratings) => {
          return (
            <RatingBlocks
              key={ratings.course_code}
              courseCode={ratings.course_code}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Ratings;
