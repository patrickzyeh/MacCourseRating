import { useParams } from "react-router-dom";

function Course() {
  const params = useParams();

  // USE POSTSQL DATABASE TO GET RATINGS

  return (
    <div className="course-title-container">
      <h2 className="course-title">{params.id}</h2>
    </div>
  );
}
export default Course;
