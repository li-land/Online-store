import Layout from "../../components/Layout";
import Section from "../../components/UI/Section";
import styles from "./Delivery.module.scss";

export default function DeliveryPage() {
  return (
    <Layout headTitle="Доставка и оплата">
      <Section title="Доставка">
        <p className={styles.text}>
          Упаковка заказа осушествляется в течение 3-4 рабочих дней с момента
          покупки.
        </p>
        <p className={styles.text}>
          После чего вы получите подтверждение отправки с трэк-номером посылки,
          либо наш оператор свяжется с вами, чтобы договориться о самовывозе.
        </p>
        <p className={styles.text}>
          Можно оформить доставку по вашему адресу или сделать самовывоз с
          нашего магазина.
        </p>
      </Section>
      <Section title="Оплата">
        <p className={styles.text}>
          Стоимость отправки рассчитывается исходя из фактических размеров и
          веса посылки.
        </p>
        <p className={styles.text}>
          Оплата производится через сайт или наличными в нашем магазине.
        </p>
      </Section>
    </Layout>
  );
}
