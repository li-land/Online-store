import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Pagination } from "antd";
import CardList from "../../components/CardList";
import Section from "../../components/UI/Section";
import { useAppDispatch, useAppSelector } from "../../hooks";
import SceletonCards from "../../components/SceletonCard";
import { ProductAsyncActionCreators } from "../../store/asyncActionCreators/product";
import styles from "./Catalog.module.scss";
import Layout from "../../components/Layout";

export default function CatalogPage(): JSX.Element {
  const { productsList, isLoading, limit } = useAppSelector(
    (state) => state.products
  );
  const [page, setPage] = useState<number>(1);
  const [sortChecked, setSortChecked] = useState<string>("");
  const { id } = useRouter().query;
  const dispatch = useAppDispatch();
  const { catalogList } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (id) {
      dispatch(
        ProductAsyncActionCreators.fetchLimitProductsFromCatalog(
          +id,
          page,
          limit,
          sortChecked
        )
      );
    }
  }, [id, page, sortChecked]);

  return (
    <Layout
      headTitle={
        catalogList[Number(id) - 1] ? catalogList[Number(id) - 1].name : ""
      }
    >
      <Section
        title={
          catalogList[Number(id) - 1] ? catalogList[Number(id) - 1].name : ""
        }
      >
        {isLoading ? (
          <SceletonCards />
        ) : productsList.count > 0 ? (
          <>
            <div className={styles.sorting} data-testid="bulka">
              Сортировать:
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setSortChecked(e.target.value);
                }}
                value={sortChecked}
              >
                <option value="" disabled>
                  выбрать
                </option>
                <option value="cheaper">сначала дешевле</option>
                <option value="expensive">сначала дороже</option>
                <option value="popular">сначала популярнее</option>
              </select>
            </div>
            <CardList cards={productsList.rows} />
          </>
        ) : (
          "Товаров в данной категории нет"
        )}
        {productsList.count > limit && (
          <div className={styles.paginationBox}>
            <Pagination
              onChange={(currentPage) => {
                setPage(currentPage);
              }}
              total={productsList.count}
              defaultPageSize={limit}
            />
          </div>
        )}
      </Section>
    </Layout>
  );
}
