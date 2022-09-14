import { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./componentStyles/RatingInput.module.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <FontAwesomeIcon
      className={`${styles[className]} ${styles.star}`}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      icon={faStar}
    />
  );
}

function Rating({ value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

function RatingInput({ name, value, onChange }) {
  const [rating, setRating] = useState(value);

  const handleSelect = (nextValue) => onChange(name, nextValue);

  const handleMouseOut = () => setRating(value);

  return (
    <Rating
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
    />
  );
}

export default RatingInput;
