import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import styles from "./componentStyles/ScrollWrapper.module.css";

import { handleData } from "../api";
export default function ScrollWrapper({
  children,
  setItems,
  getItems,
  loading,
  setPage,
}) {
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !loading) {
      getItems();
    }
  }, [inView]);

  return (
    <div className={styles.container}>
      {children}
      <div ref={ref}>{""}</div>
    </div>
  );
}
