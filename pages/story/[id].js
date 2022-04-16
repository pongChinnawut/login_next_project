import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Story {id}</h1>
      </main>
    </div>
  );
};
