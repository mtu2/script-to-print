import React, { ReactElement, useState } from "react";
import { isEmpty } from "../../utils/text";
import Buttons from "../UI/Buttons/Buttons";
import styles from "./TextSelect.module.scss";

interface Props {
  handleBack: () => void;
  handleContinue: (text: string) => void;
}

function TextSelect(props: Props): ReactElement {
  const [text, setText] = useState("");

  function showError() {
    alert("Enter text");
  }

  return (
    <div className={styles.textSelect}>
      <div className={styles.mainContainer}>
        <h2 className={styles.title}>
          <strong>2. Enter text below</strong>
        </h2>
        <p className={styles.subtitle}>
          More text is required for larger images. Enter as much text as
          possible.
        </p>
        <textarea
          value={text}
          placeholder={"Enter text..."}
          onChange={(ev) => setText(ev.target.value)}
        ></textarea>
      </div>
      <Buttons
        handleBack={props.handleBack}
        handleContinue={() =>
          isEmpty(text) ? showError() : props.handleContinue(text)
        }
      />
    </div>
  );
}

export default TextSelect;
