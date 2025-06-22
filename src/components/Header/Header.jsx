import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = function () {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img
          src="/assets/headerImages/Logo SS.png"
          alt="Logo"
          className={styles.logo}
        />
        <div className={styles.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</div>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <img src="/assets/headerImages/mage_upload.png" alt="Аналитик" />
          <span>CSV Аналитик</span>
        </NavLink>
        <NavLink
          to="/csvgenerate"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <img
            src="/assets/headerImages/oui_ml-create-multi-metric-job.png"
            alt="Генератор"
          />
          <span>CSV Генератор</span>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <img
            src="/assets/headerImages/solar_history-linear.png"
            alt="История"
          />
          <span>История</span>
        </NavLink>
      </nav>
    </header>
  );
};