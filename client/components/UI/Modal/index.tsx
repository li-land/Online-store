import { FC, ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  children: ReactNode;
}
const Modal: FC<ModalProps> = ({ title, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
