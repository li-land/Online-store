import { FC, useEffect, useState } from "react";
import styles from "./Counter.module.scss";

interface CounterProps {
  productId?: number;
  amount?: number;
  changeAmount?: (num: number, productId?: number) => void;
}
const Counter: FC<CounterProps> = ({ productId, amount, changeAmount }) => {
  const [count, setCount] = useState<number>(1);
  amount &&
    useEffect(() => {
      setCount(amount);
    }, [amount]);
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => {
          if (count <= 1) {
            setCount(1);
            return;
          }
          setCount(count - 1);
          changeAmount(count - 1, productId);
        }}
      >
        -
      </button>
      {count}
      <button
        className={styles.button}
        onClick={() => {
          setCount(count + 1);
          changeAmount(count + 1, productId);
        }}
      >
        +
      </button>
    </div>
  );
};
export default Counter;
