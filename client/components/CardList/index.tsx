import { FC } from "react";
import { IProduct } from "../../interfaces";
import Card from "../UI/Card";
import styles from "./CardList.module.scss";

interface CardListProps {
  cards: IProduct[];
}
const CardList: FC<CardListProps> = ({ cards }) => {
  return (
    <div className={styles.list}>
      {cards.map((card) => {
        return <Card key={card.id} {...card} />;
      })}
    </div>
  );
};
export default CardList;
