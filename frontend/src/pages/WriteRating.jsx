import { useParams } from "react-router-dom";
import { useState } from "react";
import StarsForm from "../components/StarsForm";

function WriteRating({ user }) {
  const params = useParams();
  const courseCode = params.id;

  const [easeRating, setEaseRating] = useState(null);
  const [practicalityRating, setPracticalityRating] = useState(null);
  const [enjoyabilityRating, setEnjoyabilityRating] = useState(null);
  const [overallRating, setOverallRating] = useState(null);

  return (
    <>
      <div className="course-container">
        <h2 className="write-title">Write a Rating for</h2>
        <h2 className="course-code">{courseCode}</h2>
      </div>
      <div className="rating-page">
        <div className="rating-form-stars">
          <StarsForm
            rating={"Ease"}
            description={"How easy was this course?"}
            setFunction={setEaseRating}
          />
          <StarsForm
            rating={"Practicality"}
            description={"How practical was this course?"}
            setFunction={setPracticalityRating}
          />
          <StarsForm
            rating={"Enjoyability"}
            description={"How enjoyable was this course?"}
            setFunction={setEnjoyabilityRating}
          />
          <StarsForm
            rating={"Overall"}
            description={"What is your overall rating of this course?"}
            setFunction={setOverallRating}
          />
        </div>

        <h3 className="rating-title">Write a Review</h3>
      </div>
    </>
  );
}
export default WriteRating;
