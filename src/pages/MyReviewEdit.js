import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleData } from "../api";
import RatingInput from "../components/RatingInput";
import styles from "./pageStyles/MyReviewEdit.module.css";

function ReviewForm({ item }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    rank: item.rank,
    description: item.description,
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
    e.preventDefault();
    const response = await handleData.PatchData(
      `/user/${item.reviewId}/review`,
      values
    );
    if (response) {
      alert("리뷰를 수정했습니다.");
      navigate("/mypage/review");
    }
  };

  const handleClick = () => {
    navigate("/mypage/review");
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
      <div className={styles.btns}>
        <button className={styles.button} type="submit">
          수정하기
        </button>
        <button onClick={handleClick} className={styles.button} type="button">
          돌아가기
        </button>
      </div>
    </form>
  );
}

function Review() {
  const location = useLocation();
  const item = location.state?.item;

  return (
    <div className={styles.review}>
      <div className={styles.title}>선물은 어떠셨나요?</div>
      <img
        className={styles.itemImg}
        src={item.product.mainImageUrl}
        alt={item.product.name}
      />
      <ReviewForm item={item} />
    </div>
  );
}

export default Review;
