import { useLocation, Link } from "react-router-dom";
import styles from "./componentStyles/Tabs.module.css";
import cx from "clsx";

const tabList = [
  { name: "상점", pathname: "/shop" },
  { name: "선물함", pathname: "/gift-box" },
  { name: "내상품", pathname: "/my-product" },
];

export default function Tabs({ onClick }) {
  const { pathname } = useLocation();
  return (
    <ul className={styles.tabList}>
      {tabList.map((tab, idx) => (
        <Tab
          key={idx}
          item={tab}
          selected={(pathname === "/" ? "/shop" : pathname) === tab.pathname}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

function Tab({ item, selected, onClick }) {
  return (
    <li className={styles.tab}>
      <Link to={item.pathname}>
        <button
          className={cx(styles.btn, { [styles.selected]: selected })}
          onClick={onClick}>
          <span>{item.name}</span>
        </button>
      </Link>
    </li>
  );
}
