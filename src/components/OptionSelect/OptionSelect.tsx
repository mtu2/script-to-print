import React, { ChangeEvent, ReactElement, useState } from "react";
import Buttons from "../UI/Buttons/Buttons";
import styles from "./OptionSelect.module.scss";

export interface Options {
  capitalise: boolean;
  font: string;
  fontSize: number;
  scaleFactor: number;
}

export const DEFAULT_OPTIONS = {
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
  options: Options;
  handleBack: (options: Options) => void;
  handleContinue: (options: Options) => void;
}

function OptionSelect(props: Props): ReactElement {
  const [options, setOptions] = useState(props.options);
  const [isDefault, setIsDefault] = useState(props.options === DEFAULT_OPTIONS);

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
      setOptions((curr) => ({ ...curr, [option]: +ev.target.value }));
    } else if (option === "capitalise") {
      setOptions((curr) => ({ ...curr, [option]: !curr[option] }));
    } else {
      setOptions((curr) => ({ ...curr, [option]: ev.target.value }));
    }
  };

  return (
    <div className={styles.optionSelect}>
      <div className={styles.mainContainer}>
        <h2 className={styles.title}>
          <strong>3. Select options</strong>
        </h2>
        <form>
          <label className={styles.defaultLabel}>
            Use default settings
            <input
              type="checkbox"
              checked={isDefault}
              onChange={handleIsDefaultClick}
            />
          </label>
          <label className={`${isDefault && styles.disabled}`}>
            Capitalise all letters
            <input
              type="checkbox"
              checked={options.capitalise}
              onChange={(ev) => handleChangeOption("capitalise", ev)}
              disabled={isDefault}
            />
          </label>
          <label className={`${isDefault && styles.disabled}`}>
            Font:
            <select
              value={options.font}
              onChange={(ev) => handleChangeOption("font", ev)}
              disabled={isDefault}
            >
              {WEB_SAFE_FONTS.map((font, index) => (
                <option value={font} key={index}>
                  {font}
                </option>
              ))}
            </select>
          </label>
          <label className={`${isDefault && styles.disabled}`}>
            Font size:
            <input
              type="number"
              value={options.fontSize}
              onChange={(ev) => handleChangeOption("fontSize", ev)}
              disabled={isDefault}
            />{" "}
          </label>
          <label className={`${isDefault && styles.disabled}`}>
            Scale factor:
            <input
              type="number"
              value={options.scaleFactor}
              onChange={(ev) => handleChangeOption("scaleFactor", ev)}
              disabled={isDefault}
            />
          </label>
        </form>
      </div>
      <Buttons
        handleBack={() => props.handleBack(options)}
        handleContinue={() => props.handleContinue(options)}
        setDownload
      />
    </div>
  );
}

export default OptionSelect;
