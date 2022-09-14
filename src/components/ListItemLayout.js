import styles from "../components/componentStyles/ListItemLayout.module.css";

export default function ListItemLayout({ children, imgSrc, title }) {
  return (
    <div className={styles.wrapper}>
      <img src={imgSrc} alt="" className={styles.img} />
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        {children}
      </div>
    </div>
  );
}
