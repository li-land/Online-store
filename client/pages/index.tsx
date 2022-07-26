import CardList from "../components/CardList";
import Section from "../components/UI/Section";
import SceletonCards from "../components/SceletonCard";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { ProductAsyncActionCreators } from "../store/asyncActionCreators/product";
import { RouteNames } from "../routes";
import Link from "next/link";
import classNames from "classnames";
import Layout from "../components/Layout";

export default function Home() {
  const { catalogList } = useAppSelector((state) => state.catalog);
  const { newProductsList, popularProductsList, isLoading } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ProductAsyncActionCreators.fetchNewAndPopularProducts());
  }, []);

  return (
    <Layout headTitle="Интернет-магазин">
      <nav>
        <ul className="list">
          {catalogList.map((catalog) => {
            return (
              <li key={catalog.id} className="item">
                <Link href={`${RouteNames.CATALOG}/${catalog.id}`}>
                  <a className={classNames("link", "linkCatalog")}>
                    {catalog.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Section title="Новинки">
        {isLoading ? <SceletonCards /> : <CardList cards={newProductsList} />}
      </Section>
      {popularProductsList.length && (
        <Section title="Популярное">
          {isLoading ? (
            <SceletonCards />
          ) : (
            <CardList cards={popularProductsList} />
          )}
        </Section>
      )}
    </Layout>
  );
}
