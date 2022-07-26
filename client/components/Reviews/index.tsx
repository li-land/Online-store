import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Rate } from "antd";
import Button from "../UI/Button";
import styles from "./Reviews.module.scss";
import { getFormattedDate } from "../../utils";
import IReview from "../../interfaces/IReview";
import { useAppSelector } from "../../hooks";
import Link from "next/link";
import { RouteNames } from "../../routes";
import { ProductAPI } from "../../http/api/product";

interface ReviewsProps {
  productId: number;
  reviews: IReview[];
}

const Reviews: FC<ReviewsProps> = ({ productId, reviews }) => {
  const [reviewsList, setReviewsList] = useState<IReview[]>([]);
  const [reviewText, setReviewText] = useState<string>("");
  const [rate, setRate] = useState<number>(5);
  const { isLogged, isAdmin } = useAppSelector((state) => state.user);
  const user = useAppSelector((state) => state.user.userData);

  const isReviewed: boolean = Boolean(
    reviewsList.find((review) => review.user.id === user.id)
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReviewsList([
      {
        id: Date.now(),
        review: reviewText,
        rate,
        createdAt: new Date().toString(),
        user,
        productId,
      },
      ...reviewsList,
    ]);
    setReviewText("");
    setRate(5);

    await ProductAPI.sendReview(productId, user.id, reviewText, rate);
  };

  useEffect(() => {
    setReviewsList(reviews);
  }, []);

  return (
    <article className={styles.reviews}>
      <h2 className={styles.title}>
        Отзывы о товаре{" "}
        {reviewsList.length ? <span>({reviewsList.length})</span> : ""}
      </h2>

      <ul className={styles.list}>
        {reviewsList.length ? (
          reviewsList.map((review) => {
            return (
              <li key={review.id} className={styles.item}>
                <div className={styles.avatar}>
                  <Avatar
                    style={{ backgroundColor: "#d9d9d9" }}
                    icon={<UserOutlined />}
                  />
                </div>
                <div className={styles.body}>
                  <div className={styles.top}>
                    <div className={styles.name}>{review.user.name}</div>
                    <span className={styles.date}>
                      {getFormattedDate(review.createdAt)}
                    </span>
                  </div>
                  <Rate disabled defaultValue={review.rate} />
                  <p className={styles.content}>{review.review}</p>
                </div>
              </li>
            );
          })
        ) : (
          <li className={styles.item}>Пока нет отзывов о товаре</li>
        )}
      </ul>

      <h2 className={styles.title}>Оставить отзыв</h2>
      {isAdmin ? (
        <span>Чтобы оставить отзыв, войдите как пользователь</span>
      ) : isLogged ? (
        isReviewed ? (
          <span>Вы уже оставили отзыв об этом товаре</span>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              maxLength={1000}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
                setReviewText(event.target.value);
              }}
              value={reviewText}
            ></textarea>
            <div className={styles.buttonContainer}>
              <div className={styles.rateContainer}>
                <span className={styles.rateText}>Оцените товар:</span>
                <Rate onChange={setRate} value={rate} />
                <span className={styles.rateText}> ({rate} из 5)</span>
              </div>
              <div className="buttonBox">
                <Button>Отправить отзыв</Button>
              </div>
            </div>
          </form>
        )
      ) : (
        <p className={styles.linkText}>
          Войдите, чтобы оставить отзыв.
          <Link href={RouteNames.LOGIN}>
            <a className={styles.link}>Войти</a>
          </Link>
        </p>
      )}
    </article>
  );
};
export default Reviews;
