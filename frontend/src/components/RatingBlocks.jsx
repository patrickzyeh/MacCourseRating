import { Link } from "react-router-dom";

function RatingBlocks(props) {
  return (
    <Link
      style={{ textDecoration: "none", color: "#ffc057" }}
      to={`/ratings/${props.courseCode}`}
    >
      <div className="rating-block-container">
        <h3>{props.courseCode}</h3>
      </div>
    </Link>
  );
}

export default RatingBlocks;
