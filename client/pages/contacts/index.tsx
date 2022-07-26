import Layout from "../../components/Layout";
import Section from "../../components/UI/Section";
import styles from "./Contacts.module.scss";

export default function ContactsPage() {
  return (
    <Layout headTitle="Контакты">
      <Section title="Контакты">
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <p className={styles.itemTitle}>Телефон:</p>
              <a href="tel:+78001234567" className={styles.link}>
                8(800) 123-45-67
              </a>
            </li>
            <li className={styles.item}>
              <p className={styles.itemTitle}>Адрес:</p>
              <p className={styles.itemText}>г.Москва, ул.Марсельская д.195</p>
            </li>
            <li className={styles.item}>
              <p className={styles.itemTitle}>E-mail:</p>
              <a href="mailto:tableware-fair@mail.ru" className={styles.link}>
                tableware-fair@mail.ru
              </a>
            </li>
            <li className={styles.item}>
              <p className={styles.itemTitle}>Время работы:</p>
              <p className="contact__item-text">ПН-ПТ, 10:00-20:00</p>
            </li>
          </ul>
          <div className={styles.map}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Afce6e46402653b1b422bf46ecf456f40a2e64e5dc9215f3ea83a319ffb185d21&amp;source=constructor"
              width="100%"
              height="400"
            ></iframe>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
