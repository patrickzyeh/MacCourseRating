import Stars from "./Stars";
import { MdDelete } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

function CourseRating(props) {
  // Delete Post Function

  const deleteRating = (course, email) => {
    try {
      fetch(`http://localhost:8000/api/ratings/delete/${course}/${email}`, {
        method: "GET",
        credentials: "include",
      }).then(window.location.reload());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rating-entry">
      <div className="overall">
        <p>Overall Rating:</p>
        <Stars filled={props.overall} />
      </div>
      <div className="ease">
        <p>Ease Rating:</p>
        <Stars filled={props.ease} />
      </div>
      <div className="practicality">
        <p>Practicality Rating:</p>
        <Stars filled={props.practicality} />
      </div>
      <div className="enjoyability">
        <p>Enjoyability Rating:</p>
        <Stars filled={props.enjoyability} />
      </div>

      <div className="date-container">
        <p className="date">{props.date}</p>

        {(() => {
          if (props.user) {
            if (props.user.email === props.email) {
              return (
                <div className="edit-btn-container">
                  <Link
                    user={props.user}
                    to={`/ratings/update/${props.course}`}
                  >
                    <button className="update-btn edit-btn">
                      <MdOutlineUpdate />
                    </button>
                  </Link>
                  <button
                    className="delete-btn edit-btn"
                    onClick={() => {
                      deleteRating(props.course, props.email);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              );
            }
          }
        })()}
      </div>

      <div className="review">
        <p>{props.review}</p>
      </div>
    </div>
  );
}
export default CourseRating;
