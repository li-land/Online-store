import { FC, ReactNode } from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  title: string;
  children: ReactNode;
}
const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
export default Section;
