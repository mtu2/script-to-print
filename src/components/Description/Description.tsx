import React, { ReactElement } from "react";
import styles from "./Description.module.scss";

function Description(): ReactElement {
  return (
    <div className={styles.description}>
      <h1>Script to Print 🎞️</h1>
      <p>
        Create posters and wallpapers by combining your favourite movie scripts
        and images
      </p>
    </div>
  );
}

export default Description;
