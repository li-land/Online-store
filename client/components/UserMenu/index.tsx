import { FC } from "react";
import {
  LogoutOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./UserMenu.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classNames from "classnames";
import Link from "next/link";
import { RouteNames } from "../../routes";
import { Tooltip } from "antd";
import { AuthAsyncActionCreators } from "../../store/asyncActionCreators/auth";

const UserMenu: FC = () => {
  const { isLogged, isAdmin, userData } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      {isLogged ? (
        <span className={styles.name}>{isAdmin ? "Админ" : userData.name}</span>
      ) : (
        <Link href={RouteNames.LOGIN}>
          <Tooltip placement="bottom" title="Войти">
            <a className={classNames(styles.link, styles.userLink)}>
              <UserOutlined />
            </a>
          </Tooltip>
        </Link>
      )}
      {isLogged && (
        <Tooltip placement="bottom" title="Выйти">
          <button
            onClick={() => {
              dispatch(AuthAsyncActionCreators.logout());
            }}
            className={styles.button}
          >
            <LogoutOutlined />
          </button>
        </Tooltip>
      )}
      {isAdmin ? (
        <Link href={RouteNames.ADMIN}>
          <Tooltip placement="bottom" title="Админ-панель">
            <a className={styles.link}>
              <PlusCircleOutlined />
            </a>
          </Tooltip>
        </Link>
      ) : (
        <div className={styles.cartBox}>
          <Link href={RouteNames.CART}>
            <Tooltip placement="bottom" title="Корзина">
              <a className={styles.link}>
                <ShoppingCartOutlined />
              </a>
            </Tooltip>
          </Link>
          {products.length > 0 && (
            <div className={styles.productAmount}>{products.length}</div>
          )}
        </div>
      )}
    </div>
  );
};
export default UserMenu;
