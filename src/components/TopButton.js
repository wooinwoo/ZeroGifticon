import { useState, useEffect } from "react";
import styles from "./componentStyles/TopButton.module.css";

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className={styles.scroll__container}>
        <button className={styles.top} onClick={scrollToTop} type="button">
          {" "}
          Top
        </button>
      </div>
    )
  );
}
