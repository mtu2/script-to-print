import React, { ReactElement, useState } from "react";
import Buttons from "../Buttons/Buttons";
import styles from "./TextSelect.module.scss";

interface Props {
  handleBack: () => void;
  handleContinue: (text: string) => void;
}

function TextSelect(props: Props): ReactElement {
  const [text, setText] = useState("");

  return (
    <div className={styles.textSelect}>
      <div className={styles.textEnterContainer}>
        <h2>
          <strong>2. Enter text below</strong>
        </h2>
        <p>
          More text is required for larger images. Enter as much text as
          possible.
        </p>
        <textarea
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        ></textarea>
      </div>
      <Buttons
        handleBack={props.handleBack}
        handleContinue={() => props.handleContinue(text)}
      />
    </div>
  );
}

export default TextSelect;
