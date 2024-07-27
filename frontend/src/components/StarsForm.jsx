import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";

function StarsForm(props) {
  const stars = Array(5).fill(0);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(null);

  useEffect(() => {
    if (props.update) {
      handleClick(props.update);
    }
  });

  const handleClick = (value) => {
    setCurrentValue(value);
    props.setFunction(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  return (
    <div className="star-form-container">
      <h3 className="rating-title">{props.rating} Rating</h3>
      <p className="rating-description">{props.description}</p>
      <div className="selectable-star-container">
        {stars.map((_, index) => {
          return (
            <FaStar
              className={"selectable-star"}
              key={index}
              color={
                (hoverValue || currentValue) > index ? "#ffc057" : "#a9a9a9"
              }
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </div>
  );
}
export default StarsForm;
