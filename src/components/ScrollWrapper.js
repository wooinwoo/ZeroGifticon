import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import styles from "./componentStyles/ScrollWrapper.module.css";

export default function ScrollWrapper({ children, setItems, url }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = async () => {
    setLoading(true);
    setTimeout(() => {
      axios.get(`${url}?_page=${page}&_limit=${10}`).then((res) => {
        setItems((items) => [...items, ...res.data]);
      });
    }, 100);
    setLoading(false);
  };
  useEffect(() => {
    if (inView && !loading) {
      setPage((page) => page + 1);
      getItems();
    }
  }, [inView, loading]);

  return (
    <div className={styles.container}>
      {children}
      <div ref={ref}>.</div>
    </div>
  );
}
