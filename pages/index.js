import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import stylesLogin from "../styles/login.module.css";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale, locales, defaultLocale, asPath } = router;
  const [responseLogin, setResponseLogin] = useState({});

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email(t("common:errorInvalidUsername"))
        .required(t("common:errorRequireUsername")),
      password: Yup.string().required(t("common:errorRequirePassword")),
    }),
    onSubmit: (values) => {
      axios
        .post(`/api/login`, {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          setResponseLogin(res.data);
          if (res.data.status == 200) {
            setInterval(() => {
              setResponseLogin("");
              router.push(`/profile?id=${res.data.id}`);
            }, 1000);
          }
        });
    },
  });

  const changeLang = (lang) => {
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  const alertValidate = () => {
    return responseLogin?.status == 200 ? (
      <div className={stylesLogin.alertSuccess}>
        {t("common:alertLoginSuccess")}
      </div>
    ) : responseLogin?.status == 400 ? (
      <div className={stylesLogin.alertFailed}>
        {t("common:alertLoginFailed")}
      </div>
    ) : (
      <></>
    );
  };

  return (
    <div>
      <div className="row g-0" style={{ background: "white" }}>
        <div
          className={`col-md-7 ${stylesLogin.contentInLogin} ${stylesLogin.leftLand}`}
        >
          <Image src="/land_login.svg" width={500} height={500} />
          <h2>{t("common:recommendation")}</h2>
          <h6>{t("common:chooseLang")}</h6>
          <select
            className={stylesLogin.selectlang}
            value={locale}
            onChange={(e) => {
              changeLang(e.target.value);
            }}
          >
            {locales.map((item, index) => (
              <option value={item}>{item.toUpperCase()}</option>
            ))}
          </select>
          {/* <ul>
            <li>EN</li>
            <li>TH</li>
          </ul> */}
        </div>
        <div
          className={`col-md-5 ${stylesLogin.contentInLogin} ${stylesLogin.rightLand}`}
        >
          {alertValidate()}
          <form
            className={`row g-3 ${stylesLogin.formColumn}`}
            onSubmit={formik.handleSubmit}
          >
            <div class="col-md-6">
              <label className={styles.labelInputText}>
                {t("common:usernameLabel")}
              </label>
              <input
                className="form-control"
                id="username"
                name="username"
                type="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className={styles.errorInputText}>
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div class="col-md-6">
              <label className={styles.labelInputText}>
                {t("common:passwordLabel")}
              </label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className={styles.errorInputText}>
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <button
              className={`btn btn-primary ${stylesLogin.btnSubmit}`}
              type="submit"
            >
              {t("common:btnSubmitLogin")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
