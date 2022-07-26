import { FC } from "react";
import styles from "./Loader.module.scss";

const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loader;
