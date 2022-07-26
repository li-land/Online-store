import classNames from "classnames";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import Link from "next/link";
import * as yup from "yup";
import Button from "../../components/UI/Button";
import Counter from "../../components/UI/Counter";
import Section from "../../components/UI/Section";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RouteNames } from "../../routes";
import { cartSlice } from "../../store/slices/cartSlice";
import styles from "./Cart.module.scss";
import placeholderImage from "../../public/placeholder-image.jpg";
import { getFormattedDate, getImageURL } from "../../utils";
import { CartAsyncActionCreators } from "../../store/asyncActionCreators/cart";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { BookingAPI } from "../../http/api/booking";
import Modal from "../../components/UI/Modal";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

export default function CartPage(): JSX.Element {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const { products, bookings, isLoading } = useAppSelector(
    (state) => state.cart
  );
  const { isLogged, isAdmin, userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const totalPrice: number = products.reduce((sum, product) => {
    return sum + product.amount * product.price;
  }, 0);
  const removeProduct = (id: number): void => {
    dispatch(cartSlice.actions.removeProduct({ id }));
  };

  const changeAmount = (num: number, productId: number): void => {
    dispatch(cartSlice.actions.changeAmount({ id: productId, amount: num }));
  };

  useEffect(() => {
    if (isLogged) {
      dispatch(CartAsyncActionCreators.fetchBookings(userData.id));
    }
  }, []);

  if (isAdmin) {
    push(RouteNames.HOST);
  }

  return (
    <Layout headTitle="Корзина">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isModalShown && (
            <Modal title="Заказ оформлен">
              <div className={styles.modalText}>
                <p>Спасибо за покупку в нашем магазине.</p>
                <p>
                  Чтобы отследить статус заказа перейдите в корзину в раздел
                  "Мои заказы".
                </p>
                <p>
                  При возникновении вопросов или изменении заказа пишите на нашу
                  почту tableware-fair@mail.ru или звоните по телефону 8 (800)
                  123-45-67.
                </p>
              </div>
              <div className="buttonBox">
                <Button
                  onClick={() => {
                    setIsModalShown(false);
                  }}
                >
                  Вернуться к покупкам
                </Button>
              </div>
            </Modal>
          )}
          <Section title="Корзина">
            {products.length ? (
              <div className={styles.cart}>
                <ul className={styles.list}>
                  <li className={styles.listHead}>
                    <div className={styles.nameBox}>Товар</div>
                    <div className={styles.priceBox}>
                      <div>Цена</div>
                      <div>Количество</div>
                      <div>Стоимость</div>
                    </div>
                  </li>
                  {products.map((product) => {
                    return (
                      <li className={styles.item} key={product.id}>
                        <div className={styles.nameBox}>
                          <img
                            className={styles.image}
                            src={
                              product.image
                                ? getImageURL(product.image)
                                : placeholderImage.src
                            }
                            alt={product.name}
                          />
                          <span className={styles.name}>{product.name}</span>
                          <button
                            onClick={() => {
                              removeProduct(product.id);
                            }}
                            className={styles.itemButton}
                          >
                            Удалить
                          </button>
                        </div>
                        <div className={styles.priceBox}>
                          <div>{product.price} руб.</div>
                          <div>
                            <Counter
                              productId={product.id}
                              amount={product.amount}
                              changeAmount={changeAmount}
                            />
                          </div>
                          <div>{product.price * product.amount} руб.</div>
                        </div>
                      </li>
                    );
                  })}
                  <li className={styles.listTotal}>
                    <div>Общая стоимость:</div>
                    <div className={styles.totalPrice}>{totalPrice} руб.</div>
                  </li>
                </ul>
                <div className={styles.checkout}>
                  <span>
                    Обратите внимание, что заказанное вами изделие может
                    незначительно отличаться от фотографии на сайте.
                  </span>
                  {isLogged ? (
                    <Formik
                      initialValues={{
                        address: "",
                      }}
                      validateOnBlur
                      validationSchema={yup.object().shape({
                        address: yup.string().required("Введите aдрес"),
                      })}
                      onSubmit={(
                        values: {
                          address: string;
                        },
                        formikHelpers: FormikHelpers<typeof values>
                      ) => {
                        dispatch(
                          CartAsyncActionCreators.createBooking(
                            userData.id,
                            values.address,
                            products
                          )
                        );
                        setIsModalShown(true);
                        formikHelpers.setSubmitting(false);
                      }}
                    >
                      {({
                        handleChange,
                        handleBlur,
                        touched,
                        errors,
                        values,
                        isSubmitting,
                      }: FormikProps<{
                        address: string;
                      }>) => (
                        <Form className={styles.form}>
                          <span className={styles.warning}>
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </span>
                          <input
                            className={styles.input}
                            type={`text`}
                            name={`address`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            placeholder={"Введите адрес доставки"}
                          />

                          <Button type="submit" disabled={isSubmitting}>
                            Оформить заказ
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <p className={styles.linkText}>
                      Для заказа необходимо войти в аккаунт
                      <Link href={RouteNames.LOGIN}>
                        <a className={styles.link}>Войти</a>
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <span>Нет товаров в корзине...</span>
            )}
          </Section>
          <Section title="Мои заказы">
            {isLogged ? (
              bookings.length ? (
                <ul className={styles.list}>
                  <li
                    className={classNames(
                      styles.listHead,
                      styles.bookingListHead
                    )}
                  >
                    <span className={styles.bookingItem}>№</span>
                    <span className={styles.bookingItem}>№ заказа</span>
                    <span className={styles.bookingItem}>Товары</span>
                    <span className={styles.bookingItem}>Стоимость заказа</span>
                    <span className={styles.bookingItem}>Адрес доставки</span>
                    <span className={styles.bookingItem}>Дата заказа</span>
                    <span className={styles.bookingItem}>Статус</span>
                  </li>
                  {bookings.map((booking, index) => {
                    return (
                      <li
                        className={classNames(styles.item, styles.booking)}
                        key={booking.id}
                      >
                        <span className={styles.bookingItem}>{index + 1}</span>
                        <span className={styles.bookingItem}>{booking.id}</span>
                        <div className={styles.bookingItem}>
                          {booking.Bookinginfos.map((item) => {
                            return (
                              <div>
                                {item.product.name} ({item.amount} шт.)
                              </div>
                            );
                          })}
                        </div>
                        <span className={styles.bookingItem}>
                          {booking.Bookinginfos.reduce((sum, product) => {
                            return sum + product.amount * product.product.price;
                          }, 0)}{" "}
                          руб.
                        </span>
                        <span className={styles.bookingItem}>
                          {booking.address}
                        </span>
                        <span className={styles.bookingItem}>
                          {getFormattedDate(booking.createdAt)}
                        </span>
                        <span className={styles.bookingItem}>
                          {booking.status}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span>У вас нет заказов</span>
              )
            ) : (
              <p className={styles.linkText}>
                Войдите, чтобы увидеть свои заказы
                <Link href={RouteNames.LOGIN}>
                  <a className={styles.link}>Войти</a>
                </Link>
              </p>
            )}
          </Section>
        </>
      )}
    </Layout>
  );
}
