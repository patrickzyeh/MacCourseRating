import { useParams } from "react-router-dom";
import { useState } from "react";
import StarsForm from "../components/StarsForm";
import toast, { Toaster } from "react-hot-toast";

function WriteRating(props) {
  const params = useParams();
  const courseCode = params.id;

  const [easeRating, setEaseRating] = useState(null);
  const [practicalityRating, setPracticalityRating] = useState(null);
  const [enjoyabilityRating, setEnjoyabilityRating] = useState(null);
  const [overallRating, setOverallRating] = useState(null);

  const [commentInput, setCommentInput] = useState(null);

  const handleChange = (value) => {
    setCommentInput(value);
  };

  const postRating = async () => {
    if (commentInput.length >= 30) {
      try {
        await fetch("https://vector.profanity.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: commentInput }),
        }).then(async (data) => {
          const json = await data.json();
          console.log(json.isProfanity);

          if (!json.isProfanity) {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0");
            var yyyy = today.getFullYear().toString();

            const date = mm + "/" + dd + "/" + yyyy.substring(yyyy.length - 2);

            try {
              const response = await fetch(
                `http://localhost:8000/api/ratings/post/${courseCode}/${props.user.email}`,
                {
                  method: "POST",
                  body: new URLSearchParams({
                    easeRating: easeRating,
                    practicalityRating: practicalityRating,
                    enjoyabilityRating: enjoyabilityRating,
                    overallRating: overallRating,
                    comment: commentInput,
                    postDate: date,
                  }),
                }
              );
              if (response.ok) {
                toast.success("Rating created!");
              } else {
                toast.error("Users are limited to 1 rating per course.");
              }
            } catch (error) {
              toast.error("Couldn't create post.");
            }
          } else {
            toast.error("Comment includes profanity.");
          }
        });
      } catch (error) {
        console.log(error);
        toast.error("Couldn't create post.");
      }
    } else {
      toast.error("Minimum of 30 characters required.");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
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

        <div className="comment-container">
          <h3 className="rating-title comment-prompt">Write a Comment</h3>
          <textarea
            id="comment"
            name="comment"
            maxLength="500"
            placeholder="What would you like others to know about this course? (min 30 characters, max 500 characters)"
            rows={5}
            onChange={(e) => handleChange(e.target.value)}
          ></textarea>
        </div>

        <button
          className={`post-button ${
            easeRating &&
            practicalityRating &&
            enjoyabilityRating &&
            overallRating &&
            commentInput
              ? "button-enabled"
              : "button-disabled"
          }`}
          disabled={
            easeRating &&
            practicalityRating &&
            enjoyabilityRating &&
            overallRating &&
            commentInput
              ? false
              : true
          }
          onMouseDown={postRating}
        >
          Post Rating
        </button>
      </div>
    </>
  );
}
export default WriteRating;
