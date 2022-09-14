import { useState } from "react";
import { useLocation } from "react-router-dom";
import RatingInput from "../components/RatingInput";
import styles from "./pageStyles/Review.module.css";

function ReviewForm() {
  const [values, setValues] = useState({
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <RatingInput
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleChange}
        className={styles.ratingInput}
      />
      <textarea
        type="text"
        name="content"
        value={values.content}
        onChange={handleChange}
        className={styles.content}
      />
      <button className={styles.button} type="submit">
        리뷰 제출하기
      </button>
    </form>
  );
}

function Review() {
  const location = useLocation();
  const item = location.state?.item;

  return (
    <div className={styles.review}>
      <div className={styles.title}>선물은 어떠셨나요?</div>
      <img className={styles.itemImg} src={item.img} alt={item.title} />
      <ReviewForm />
    </div>
  );
}

export default Review;
