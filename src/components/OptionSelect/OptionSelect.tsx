import React, { ChangeEvent, ReactElement, useState } from "react";
import Buttons from "../UI/Buttons/Buttons";
import styles from "./OptionSelect.module.scss";

export interface Options {
  capitalise: boolean;
  font: string;
  fontSize: number;
  scaleFactor: number;
}

const DEFAULT_OPTIONS = {
  capitalise: false,
  font: "EB Garamond",
  fontSize: 18,
  scaleFactor: 4,
};

const WEB_SAFE_FONTS = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
];

interface Props {
  handleBack: () => void;
  handleContinue: (options: Options) => void;
}

function OptionSelect(props: Props): ReactElement {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [isDefault, setIsDefault] = useState(true);

  const handleIsDefaultClick = (
    ev: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!isDefault) {
      setOptions(DEFAULT_OPTIONS);
    }
    setIsDefault((curr) => !curr);
  };

  const handleChangeOption = (
    option: string,
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ): void => {
    if (option === "fontSize" || option === "scaleFactor") {
      if (+ev.target.value < 1) return;
    }
    setOptions((curr) => ({ ...curr, [option]: ev.target.value }));
  };

  return (
    <div className={styles.optionSelect}>
      <div className={styles.mainContainer}>
        <h2 className={styles.title}>
          <strong>3. Select options</strong>
        </h2>
        <label>
          Use default settings:
          <input
            type="checkbox"
            checked={isDefault}
            onChange={handleIsDefaultClick}
          />
        </label>
        <label>
          Capitalise all letters:
          <input
            type="checkbox"
            checked={options.capitalise}
            onChange={(ev) => handleChangeOption("capitalise", ev)}
            disabled={isDefault}
          />
        </label>
        <label>
          Font:
          <select
            value={options.font}
            onChange={(ev) => handleChangeOption("font", ev)}
          >
            {WEB_SAFE_FONTS.map((font, index) => (
              <option value={font} key={index}>
                {font}
              </option>
            ))}
          </select>
        </label>
        <label>
          Font size:
          <input
            type="number"
            value={options.fontSize}
            onChange={(ev) => handleChangeOption("fontSize", ev)}
            disabled={isDefault}
          />{" "}
        </label>
        <label>
          Scale factor:
          <input
            type="number"
            value={options.scaleFactor}
            onChange={(ev) => handleChangeOption("scaleFactor", ev)}
            disabled={isDefault}
          />
        </label>
      </div>
      <Buttons
        handleBack={props.handleBack}
        handleContinue={() => props.handleContinue(options)}
      />
    </div>
  );
}

export default OptionSelect;
