import { FC } from "react";
import Link from "next/link";
import { useAppSelector } from "../../../hooks";
import classNames from "classnames";
import styles from "./Header.module.scss";
import UserMenu from "../../UserMenu";
import { RouteNames } from "../../../routes";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Header: FC = () => {
  const { catalogList } = useAppSelector((state) => state.catalog);
  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <a className={styles.logo}>Tableware Fair</a>
      </Link>
      <div className={styles.userMenu}>
        <UserMenu />
      </div>
      <nav className={styles.menu}>
        <ul className="list">
          <li className="item">
            <Link href={RouteNames.HOST}>
              <a className={classNames("link", styles.menuLink)}>Главная</a>
            </Link>
          </li>
          <li className="item">
            <Dropdown
              trigger={["click"]}
              className={classNames("link", styles.menuLink)}
              overlay={
                <Menu
                  items={catalogList.map((catalog, index) => {
                    return {
                      key: index + 1,
                      label: (
                        <Link href={`${RouteNames.CATALOG}/${catalog.id}`}>
                          <a>{catalog.name}</a>
                        </Link>
                      ),
                    };
                  })}
                />
              }
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Каталог товаров
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </li>
          <li className="item">
            <Link href={RouteNames.DELIVERY}>
              <a className={classNames("link", styles.menuLink)}>
                Доставка и оплата
              </a>
            </Link>
          </li>
          <li className="item">
            <Link href={RouteNames.CONTACTS}>
              <a className={classNames("link", styles.menuLink)}>Контакты</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
