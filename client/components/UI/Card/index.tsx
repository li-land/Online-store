import Link from "next/link";
import { FC } from "react";
import { IProduct } from "../../../interfaces";
import { RouteNames } from "../../../routes";
import placeholderImage from "../../../public/placeholder-image.jpg";
import styles from "./Card.module.scss";
import { getImageURL } from "../../../utils";
import { Rate } from "antd";

const Card: FC<IProduct> = ({ id, image, name, price, rating }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={`${RouteNames.PRODUCT}/${id}`}>
        <a className={styles.link}>
          <div className={styles.inner}>
            <div className={styles.image}>
              <img
                src={image ? getImageURL(image) : placeholderImage.src}
                alt={name}
              />
            </div>
            <div className={styles.title}>{name}</div>
            <div className={styles.bottom}>
              <div className={styles.price}>{price} руб.</div>
              <Rate disabled defaultValue={rating} />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default Card;
