import styles from "../components/componentStyles/ListItemLayout.module.css";

export default function ListItemLayout({ children, imgSrc, title }) {
  return (
    <div className={styles.wrapper} key={imgSrc + title + new Date()}>
      <img
        src={imgSrc}
        alt=""
        className={styles.img}
        width="30vw"
        maxWidth="250px"
      />
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        {children}
      </div>
    </div>
  );
}
