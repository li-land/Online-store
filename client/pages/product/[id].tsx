import { Rate } from "antd";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Button from "../../components/UI/Button";
import Counter from "../../components/UI/Counter";
import Reviews from "../../components/Reviews";
import styles from "./ProductPage.module.scss";
import { ProductAPI } from "../../http/api/product";
import { GetServerSideProps } from "next";
import { IProduct } from "../../interfaces";
import { getImageURL } from "../../utils";
import placeholderImage from "../../public/placeholder-image.jpg";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { cartSlice } from "../../store/slices/cartSlice";
import Layout from "../../components/Layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await ProductAPI.getOne(+id);
  return { props: { ...response.data } };
};

export default function ProductPage({
  id,
  name,
  image,
  price,
  reviews,
  rating,
  productInfo = [],
}: IProduct): JSX.Element {
  const [amount, setAmount] = useState<number>(1);
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const changeAmount = (num: number): void => {
    setAmount(num);
  };

  const addProduct = (product: IProduct): void => {
    if (
      products.length &&
      Boolean(products.find((item) => item.id === product.id))
    ) {
      return alert(
        `${product.name} вы уже добавили в корзину. Там вы сможете поменять его количество.`
      );
    }
    dispatch(cartSlice.actions.addProduct(product));
  };

  return (
    <Layout headTitle={name}>
      <div className={styles.wrapper}>
        <div className={styles.product}>
          {image ? (
            <InnerImageZoom
              className={styles.image}
              src={getImageURL(image)}
              zoomScale={1.5}
            />
          ) : (
            <img
              className={styles.imagePlaceholder}
              src={placeholderImage.src}
              alt={name}
            />
          )}

          <div className={styles.content}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.rating}>
              <Rate disabled defaultValue={rating} />
              <span className={styles.ratingNumber}>({rating} из 5)</span>
            </div>
            <div className={styles.price}>{price} руб.</div>
            <h3 className={styles.listTitle}>Описание</h3>
            <ul className={styles.list}>
              {productInfo.map((item) => {
                return (
                  <li key={item.id} className={styles.item}>
                    <span className={styles.feature}>{item.title}:</span>
                    <span className={styles.value}>{item.description}</span>
                  </li>
                );
              })}
            </ul>
            <div className={styles.buttonContainer}>
              <Counter changeAmount={changeAmount} />
              <div className="buttonBox">
                <Button
                  onClick={() => {
                    addProduct({
                      id,
                      image,
                      name,
                      price,
                      amount,
                      rating,
                      productInfo,
                    });
                  }}
                >
                  Добавить в корзину
                </Button>
              </div>
            </div>
            <div className={styles.notice}>
              <p>
                Обратите внимание, что заказанное вами изделие может
                незначительно отличаться от фотографии на сайте.
              </p>
              <p>
                Это происходит потому, что каждый предмет изготавливается
                вручную. Все изделия похожи, но не одинаковы.
              </p>
            </div>
          </div>
        </div>
        <Reviews productId={id} reviews={reviews} />
      </div>
    </Layout>
  );
}
