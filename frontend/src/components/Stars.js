function Stars(props) {
  const starArray = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= props.filled) {
      starArray.push(
        <span key={i} className="stars">
          &#9733;
        </span>
      );
    } else {
      starArray.push(
        <span key={i} className="stars">
          &#9734;
        </span>
      );
    }
  }

  return <div className="stars-container">{starArray}</div>;
}
export default Stars;
