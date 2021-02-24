import React, { ReactElement } from "react";
import styles from "./Footer.module.scss";
import { ReactComponent as LinkedinIcon } from "../../icons/linkedin.svg";
import { ReactComponent as GithubIcon } from "../../icons/github.svg";

function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      Made by{" "}
      <a href="https://mttu.dev" title="https://mttu.dev">
        Michael
      </a>{" "}
      &nbsp; |{" "}
      <a href="https://github.com/mtu2/script-to-print" title="GitHub">
        <GithubIcon className={styles.socialIcon} />
      </a>{" "}
      <a href="https://www.linkedin.com/in/tu-michael" title="Linkedin">
        <LinkedinIcon className={styles.socialIcon} />
      </a>
    </footer>
  );
}

export default Footer;
