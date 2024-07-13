import Stars from "./Stars";
import { MdDelete } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";

function CourseRating(props) {
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
                  <button className="update-btn edit-btn">
                    <MdOutlineUpdate />
                  </button>
                  <button className="delete-btn edit-btn">
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
