import React from "react";
import styles from "../styles/MatBang.module.css";

export default function MatBang() {
  return (
    <section className={styles.matbang} id="mat-bang">
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>MẶT BẰNG TỔNG THỂ LUSSO SAIGON</h2>
          <div className={styles.line}></div>
        </div>

        {/* IMAGE */}
        <div className={styles.imageWrapper}>
          <div className={styles.image}></div>
        </div>
      </div>
    </section>
  );
}
