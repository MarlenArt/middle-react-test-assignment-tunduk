import { Link } from "react-router";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.header_links}>
          <Link to="/">
            <div className={styles.header_links__link}>Главная</div>
          </Link>
          <div className={styles.header_links__link}>Информация</div>
        </div>
        <div className={styles.header_profile}>
          <div>Профиль</div>
        </div>
      </div>
    </div>
  );
};
