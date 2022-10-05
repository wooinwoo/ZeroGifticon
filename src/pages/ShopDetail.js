import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./pageStyles/ShopDetail.module.css";
import cx from "clsx";
import { handleData } from "../api";

import viewIcon from "../images/view.svg";
import heartIcon from "../images/heart.svg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ShopDetail({ id = null }) {
  const state = useLocation().state.data;
  const RATINGS = [1, 2, 3, 4, 5];
  const [data, setData] = useState({});
  const [likeList, setLikeList] = useState({});
  const [like, setLike] = useState("");
  const [getComplet, setGetComplet] = useState(false);
  const [review, setReview] = useState({ data: [] });

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });
  const defaultImg =
    "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg";

  const nextSlide = () => {
    if (currentImgIndex + 1 !== data.images.length) {
      setCurrentImgIndex(currentImgIndex + 1);
      setStyle({
        transform: `translateX(-${currentImgIndex + 1}00%)`,
        transition: `all 0.4s ease-in-out`,
      });
    }
  };
  const prevSlide = () => {
    if (currentImgIndex !== 0) {
      setCurrentImgIndex(currentImgIndex - 1);
      setStyle({
        transform: `translateX(-${currentImgIndex - 1}00%)`,
        transition: `all 0.4s ease-in-out`,
      });
    }
  };

  useEffect(() => {
    getData();
    const res = handleData.getData(`/review/product/${state.id}`);
    res.then((val) => {
      setReview(val);
    });
  }, []);

  useEffect(() => {
    console.log(likeList, data);
    readLike();
  }, [getComplet]);

  const getData = () => {
    if (id === null) {
      id = state.id;
    }
    const res = handleData.getData(`/product/detail/${id}`);
    res.then((val) => {
      setData(val.data);
      getLikeList();
    });
  };

  const getLikeList = () => {
    const res = handleData.getData(`/user/likes/list`);
    res.then((val) => {
      setLikeList(val.data);
      setGetComplet(!getComplet);
    });
  };

  const readLike = () => {
    let cop = false;
    if (likeList.length) {
      for (let d of likeList) {
        if (d.productLikeResponse.id === data.id) {
          cop = true;
        }
      }
    }
    if (cop === true) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  const likeToggle = () => {
    const res = handleData.createData(`/user/${data.id}/likes`);
    res
      .then((val) => {
        console.log(val.data);
        getLikeList();
      })
      .catch((error) => console.log(error));
  };

  function Star({ selected = false, rating }) {
    const className = `${selected ? "selected" : ""}`;
    return (
      <FontAwesomeIcon
        className={`${styles[className]} ${styles.star}`}
        icon={faStar}
      />
    );
  }

  console.log(review);
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.banner_images} style={style}>
          {data.images &&
            data.images.map((d) => (
              <img
                key={d.productImageId}
                src={d.url}
                className={styles.img}
                alt=""
              />
            ))}
        </div>
        <button className={styles.prevBtn} onClick={prevSlide}>
          {"<"}
        </button>
        <button className={styles.nextBtn} onClick={nextSlide}>
          {">"}
        </button>
      </div>
      <div className={styles.mini_images}>
        {data.images &&
          data.images.map((d, idx) => (
            <span
              key={d.productImageId}
              className={cx(styles.mini_box, {
                [styles.mini_imgP]: idx === currentImgIndex,
              })}>
              <img src={d.url} className={styles.mini_img} alt="" />
            </span>
          ))}
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.price}>{data.price}원</span>
        <div className={styles.iconArea}>
          <img src={viewIcon} alt="viewIcon" />
          <span>{data.viewCount}</span>
          <img src={heartIcon} alt="heartIcon" />
          <span>{data.likeCount}</span>
        </div>
        <div className={styles.description}>{data.description}</div>
      </div>
      <div className={styles.reviewArea}>
        <div className={styles.reviewTitle}>리뷰 {review.data.length}</div>
        {review.data.map((d, idx) => (
          <div className={styles.memberReview} key={idx}>
            <div className={styles.reviewHeader}>
              {d.member.profileImageUrl != null ? (
                <img
                  className={styles.memberImg}
                  src={d.member.profileImageUrl}
                  alt=""
                />
              ) : (
                <img className={styles.memberImg} src={defaultImg} alt="" />
              )}
              <span className={styles.memberInfo}>
                <div className={styles.nickName}>{d.member.nickname}</div>
                {RATINGS.map((rating) => (
                  <Star
                    key={rating}
                    className={`${styles.star}`}
                    icon={faStar}
                    selected={d.rank >= rating ? true : false}
                  />
                ))}
              </span>
              <div className={styles.reviewDate}>
                {d.updateDate.slice(0, 10)}
              </div>
              <div className={styles.reviewDescription}>{d.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.btnArea}>
        <button
          className={cx(styles.heartBtn, {
            [styles.btn]: like === true,
          })}
          onClick={() => likeToggle()}>
          {like === true ? <span>❤️</span> : <span>♡</span>} 좋아요
        </button>
        <Link to="/shop/gift" state={data}>
          <button className={styles.giftBtn}>선물하기</button>
        </Link>
      </div>
    </div>
  );
}

export default ShopDetail;
