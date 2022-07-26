import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import Link from "next/link";
import styles from "./AuthPage.module.scss";
import { RouteNames } from "../../routes";
import Button from "../../components/UI/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AuthAsyncActionCreators } from "../../store/asyncActionCreators/auth";
import { useRouter } from "next/router";
import { userSlice } from "../../store/slices/userSlice";
import { useEffect } from "react";
import Layout from "../../components/Layout";

interface InputValues {
  email: string;
  password: string;
}

export default function LoginPage(): JSX.Element {
  const { error, isLogged } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (error) {
    alert(error);
    dispatch(userSlice.actions.setError(""));
  }

  useEffect(() => {
    if (isLogged) {
      router.back();
    }
  }, [isLogged]);

  const validationSchema = yup.object().shape({
    email: yup.string().email("Некорректный email").required("Введите email"),
    password: yup.string().required("Введите пароль"),
  });
  return (
    <Layout headTitle="Войти">
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <h2 className="title">Добро пожаловать</h2>
          <p>Введите пожалуйста данные для входа</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={(
              values: InputValues,
              formikHelpers: FormikHelpers<InputValues>
            ) => {
              dispatch(
                AuthAsyncActionCreators.login(values.email, values.password)
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

                <Button type="submit" disabled={isSubmitting}>
                  Войти
                </Button>
              </Form>
            )}
          </Formik>
          <p className={styles.linkText}>
            Нет аккаунта?
            <Link href={RouteNames.REGISTRATION}>
              <a className={styles.link}>Зарегистрироваться</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
