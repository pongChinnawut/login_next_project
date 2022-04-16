import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import stylesProfile from "../../styles/Profile.module.css";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function profile() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    console.log("ddd");
    axios.get(`/api/search?id=${id}`).then((res) => {
      setDataUser(res.data);
    });
  }, [id]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image src="/user.png" width={300} height={300} />
        {dataUser?.data?.name ? (
          <h1>{`${t("profile:textWelcome")} ${dataUser.data.name}`}</h1>
        ) : (
          <div className={stylesProfile.mainNotfound}>
            <h1>{t("profile:notFoundThisUser")}</h1>
            <button
              className={stylesProfile.btnReLogin}
              onClick={() => {
                router.push("/");
              }}
            >
              {t("profile:relogin")}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
