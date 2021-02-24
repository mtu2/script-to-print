import React, { ReactElement } from "react";
import styles from "./Buttons.module.scss";

import { ReactComponent as RightArrowIcon } from "../../../icons/east-white-48dp.svg";
import { ReactComponent as LeftArrowIcon } from "../../../icons/west-white-48dp.svg";

interface Props {
  // callbacks
  handleBack?: () => void;
  handleContinue?: () => void;
  setDownload?: boolean;
  disableBack?: boolean;
  disableContinue?: boolean;
}

function Buttons({
  handleBack,
  handleContinue,
  setDownload = false,
  disableBack = false,
  disableContinue = false,
}: Props): ReactElement {
  return (
    <div className={`${styles.buttons} ${disableBack && styles.disableBack}`}>
      {!disableBack && (
        <button
          onClick={handleBack ? handleBack : undefined}
          className={styles.backBtn}
        >
          <LeftArrowIcon className={styles.icon} />
          Back
        </button>
      )}
      {!disableContinue &&
        (setDownload ? (
          <button
            onClick={handleContinue ? handleContinue : undefined}
            className={styles.downloadBtn}
          >
            Create & Download
          </button>
        ) : (
          <button
            onClick={handleContinue ? handleContinue : undefined}
            className={styles.continueBtn}
          >
            Continue
            <RightArrowIcon className={styles.icon} />
          </button>
        ))}
    </div>
  );
}

export default Buttons;
