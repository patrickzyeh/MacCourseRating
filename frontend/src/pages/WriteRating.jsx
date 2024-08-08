import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import StarsForm from "../components/StarsForm";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function WriteRating(props) {
  const params = useParams();
  const courseCode = params.id;

  const [easeRating, setEaseRating] = useState(null);
  const [practicalityRating, setPracticalityRating] = useState(null);
  const [enjoyabilityRating, setEnjoyabilityRating] = useState(null);
  const [overallRating, setOverallRating] = useState(null);

  const [commentInput, setCommentInput] = useState(null);

  useEffect(() => {
    const getPreviousRating = async () => {
      try {
        const response = await axios.get(
          `https://course-ratings-backend-4cc685a03b26.herokuapp.com/api/ratings/specific/${courseCode}/${props.user.email}`
        );
        if (response.data.length === 1) {
          setEaseRating(response.data[0].ease_rating);
          setPracticalityRating(response.data[0].practicality_rating);
          setEnjoyabilityRating(response.data[0].enjoyability_rating);
          setOverallRating(response.data[0].overall_rating);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (props.update) {
      getPreviousRating();
    }
  }, []);

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
                `https://course-ratings-backend-4cc685a03b26.herokuapp.com/api/ratings/post/${courseCode}/${props.user.email}`,
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

  const updateRating = async () => {
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
            try {
              const response = await fetch(
                `https://course-ratings-backend-4cc685a03b26.herokuapp.com/api/ratings/update/${courseCode}/${props.user.email}`,
                {
                  method: "PATCH",
                  body: new URLSearchParams({
                    easeRating: easeRating,
                    practicalityRating: practicalityRating,
                    enjoyabilityRating: enjoyabilityRating,
                    overallRating: overallRating,
                    comment: commentInput,
                  }),
                }
              );
              if (response.ok) {
                toast.success("Rating updated!");
              } else {
                toast.error("Error updating post.");
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
        toast.error("Couldn't update post.");
      }
    } else {
      toast.error("Minimum of 30 characters required.");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="course-container">
        <h2 className="write-title">
          {props.update ? "Update Your Rating for" : "Write a Rating for"}
        </h2>
        <h2 className="course-code">{courseCode}</h2>
      </div>
      <div className="rating-page">
        <div className="rating-form-stars">
          <StarsForm
            rating={"Ease"}
            description={"How easy was this course?"}
            setFunction={setEaseRating}
            update={props.update ? easeRating : null}
          />
          <StarsForm
            rating={"Practicality"}
            description={"How practical was this course?"}
            setFunction={setPracticalityRating}
            update={props.update ? practicalityRating : null}
          />
          <StarsForm
            rating={"Enjoyability"}
            description={"How enjoyable was this course?"}
            setFunction={setEnjoyabilityRating}
            update={props.update ? enjoyabilityRating : null}
          />
          <StarsForm
            rating={"Overall"}
            description={"What is your overall rating of this course?"}
            setFunction={setOverallRating}
            update={props.update ? overallRating : null}
          />
        </div>

        <div className="comment-container">
          <h3 className="rating-title comment-prompt">Write a Comment</h3>
          <textarea
            id="comment"
            name="comment"
            maxLength="500"
            placeholder="What would you like others to know about this course? (min 30 characters, max 500 characters)"
            rows={3}
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
          onMouseDown={props.update ? updateRating : postRating}
        >
          {props.update ? "Update Rating" : "Post Rating"}
        </button>
      </div>
    </>
  );
}
export default WriteRating;
