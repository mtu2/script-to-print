import React, { ReactElement } from "react";
import styles from "./Loader.module.scss";

function Loader(): ReactElement {
  return (
    <div className={styles.ldsFacebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
