import { FC } from "react";
import ContentLoader from "react-content-loader";
import { useAppSelector } from "../../store";
import styles from "./SceletonCard.module.scss";

const SceletonCards: FC = () => {
  return (
    <div className={styles.list}>
      {[...new Array(8)].map((_, index) => {
        return (
          <ContentLoader
            className={styles.wrapper}
            key={index}
            speed={2}
            viewBox="0 0 400 490"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="6" rx="0" ry="0" width="100%" height="400" />
            <rect x="0" y="420" rx="0" ry="0" width="200" height="30" />
            <rect x="0" y="460" rx="0" ry="0" width="100" height="30" />
          </ContentLoader>
        );
      })}
    </div>
  );
};
export default SceletonCards;
