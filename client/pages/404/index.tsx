import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Button from "../../components/UI/Button";
import styles from "./404.module.scss";

export default function NotFoundPage(): JSX.Element {
  const { back } = useRouter();

  return (
    <Layout headTitle="Страница не найдена">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.code}>404</div>
          <div className={styles.info}>Запрашиваемая страница не найдена</div>
          <div className="buttonBox">
            <Button
              onClick={() => {
                back();
              }}
            >
              Вернуться назад
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
