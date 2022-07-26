import { FC } from "react";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.content}>
        <p>© Интернет-магазин «Tableware Fair» | Посуда и товары для дома</p>
        <p>Все авторские права защищены</p>
      </div>
    </footer>
  );
};

export default Footer;
