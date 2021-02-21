import React, { ReactElement, useState } from "react";
import Buttons from "../Buttons/Buttons";
import styles from "./OptionSelect.module.scss";

export interface Options {
  capitalise: boolean;
  scaleFactor: number;
  font: string;
}

const DEFAULT_OPTIONS = {
  capitalise: false,
  scaleFactor: 4,
  font: "EB Garamond",
};

interface Props {
  handleBack: () => void;
  handleContinue: (options: Options) => void;
}

function OptionSelect(props: Props): ReactElement {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  return (
    <div className={styles.optionSelect}>
      <div className={styles.mainContainer}>
        <h2>
          <strong>3. Select options</strong>
        </h2>
        <p>Capitalise all letters</p>
        <p>Font: Courier</p>
        <p>Scale factor: 4x</p>
      </div>
      <Buttons
        handleBack={props.handleBack}
        handleContinue={() => props.handleContinue(options)}
      />
    </div>
  );
}

export default OptionSelect;
