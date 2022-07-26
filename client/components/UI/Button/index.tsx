import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./Button.module.scss";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
