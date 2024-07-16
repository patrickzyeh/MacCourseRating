import { useState } from "react";
import CourseRating from "../components/CourseRating";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Dashboard(props) {
  const [option, setOption] = useState("account");
  const [ratings, setRatings] = useState([]);

  const handleMouseClick = () => {
    if (option === "account") {
      setOption("ratings");
    } else {
      setOption("account");
    }
  };

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/ratings/user/${props.user.email}`
        );
        setRatings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-panel left-panel">
        <h2 className="dashboard-title">Dashboard</h2>

        <p className="dashboard-email">{props.user.email}</p>

        <div className="dashboard-button-container">
          <button
            className="dashboard-button"
            style={{
              backgroundColor: option === "account" ? "#7a003c" : "#ffc057",
            }}
            onClick={handleMouseClick}
          >
            My Account
          </button>
          <button
            className="dashboard-button"
            style={{
              backgroundColor: option === "ratings" ? "#7a003c" : "#ffc057",
            }}
            onClick={handleMouseClick}
          >
            My Ratings
          </button>
        </div>
      </div>
      <div className="dashboard-panel right-panel">
        {option === "account" ? (
          <>
            <h1>Account</h1>{" "}
            <p className="dashboard-email">Signed in with {props.user.email}</p>{" "}
            <Link
              className={"logout-btn-container"}
              to={"http://localhost:8000/auth/logout"}
            >
              <button className="logout-btn">Sign Out</button>
            </Link>
          </>
        ) : (
          <>
            <h1>Ratings</h1>
            {ratings.length === 0 ? (
              <p>No ratings</p>
            ) : (
              <>
                <p className="dashboard-num-rating">
                  {ratings.length} {ratings.length === 1 ? "rating" : "ratings"}
                </p>
                {ratings
                  .slice()
                  .reverse()
                  .map((rating) => {
                    return (
                      <CourseRating
                        key={rating.id}
                        course={rating.course_code}
                        email={rating.email}
                        ease={rating.ease_rating}
                        practicality={rating.practicality_rating}
                        enjoyability={rating.enjoyability_rating}
                        overall={rating.overall_rating}
                        date={rating.date}
                        review={rating.review}
                        user={props.user}
                      />
                    );
                  })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
