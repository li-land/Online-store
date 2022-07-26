import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import Link from "next/link";
import styles from "./AuthPage.module.scss";
import { RouteNames } from "../../routes";
import Button from "../../components/UI/Button";
import { AuthAsyncActionCreators } from "../../store/asyncActionCreators/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useRouter } from "next/router";
import { userSlice } from "../../store/slices/userSlice";
import Layout from "../../components/Layout";

interface InputValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegistrationPage(): JSX.Element {
  const { error, isLogged } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  if (error) {
    alert(error);
    dispatch(userSlice.actions.setError(""));
  }
  if (isLogged) {
    push(RouteNames.HOST);
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required("Введите имя"),
    email: yup.string().email("Некорректный email").required("Введите email"),
    password: yup.string().required("Введите пароль"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Введите пароль"),
  });
  return (
    <Layout headTitle="Регистрация">
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <h2 className="title">Добро пожаловать</h2>
          <p>Введите пожалуйста данные для входа</p>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(
              values: InputValues,
              formikHelpers: FormikHelpers<InputValues>
            ) => {
              dispatch(
                AuthAsyncActionCreators.registration(
                  values.name,
                  values.email,
                  values.confirmPassword
                )
              );
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
            }: FormikProps<InputValues>) => (
              <Form className={styles.form}>
                <span className={styles.warning}>
                  {errors.name && touched.name && errors.name}
                </span>
                <input
                  className={styles.input}
                  type={`text`}
                  name={`name`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder={"Ваше имя"}
                />
                <span className={styles.warning}>
                  {errors.email && touched.email && errors.email}
                </span>
                <input
                  className={styles.input}
                  type={`email`}
                  name={`email`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder={"E-mail"}
                />
                <span className={styles.warning}>
                  {errors.password && touched.password && errors.password}
                </span>
                <input
                  className={styles.input}
                  type={`password`}
                  name={`password`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder={"Пароль"}
                />
                <span className={styles.warning}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </span>
                <input
                  className={styles.input}
                  type={`password`}
                  name={`confirmPassword`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  placeholder={"Повторите пароль"}
                />
                <Button type="submit" disabled={isSubmitting}>
                  Зарегестрироваться
                </Button>
              </Form>
            )}
          </Formik>
          <p className={styles.linkText}>
            Есть аккаунт?
            <Link href={RouteNames.LOGIN}>
              <a className={styles.link}>Войти</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
