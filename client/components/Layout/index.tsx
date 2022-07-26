import Head from "next/head";
import { FC, ReactNode } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AuthAsyncActionCreators } from "../../store/asyncActionCreators/auth";
import { CatalogAsyncActionCreators } from "../../store/asyncActionCreators/catalog";
import Loader from "../Loader";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.scss";

interface LayoutProps {
  headTitle: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ headTitle, children }) => {
  const { isLoading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(AuthAsyncActionCreators.checkAuth());
    dispatch(CatalogAsyncActionCreators.fetchAll());
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{headTitle} | TableFair</title>
      </Head>
      <div className={styles.wrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
