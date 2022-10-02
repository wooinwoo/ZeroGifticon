import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleData } from "../api";
import RatingInput from "../components/RatingInput";
import styles from "./pageStyles/Review.module.css";

function ReviewForm({ item }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    rank: 0,
    description: "",
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = async (e) => {
    console.log(item);
    e.preventDefault();
    const response = await handleData.createData(
      `/user/${item.productId}/review`,
      values
    );
    if (response) {
      alert("리뷰를 생성했습니다.");
      navigate("/gift-box");
    }
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <RatingInput
        type="number"
        name="rank"
        value={values.rank}
        onChange={handleChange}
        className={styles.ratingInput}
      />
      <textarea
        type="text"
        name="description"
        value={values.description}
        onChange={handleInputChange}
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
      <img className={styles.itemImg} src={item.imageUrl} alt={item.name} />
      <ReviewForm item={item} />
    </div>
  );
}

export default Review;
