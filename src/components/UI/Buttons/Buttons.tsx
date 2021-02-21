import React, { ReactElement } from "react";
import styles from "./Buttons.module.scss";

import { ReactComponent as RightArrowIcon } from "../../../icons/east-white-48dp.svg";
import { ReactComponent as LeftArrowIcon } from "../../../icons/west-white-48dp.svg";

interface Props {
  // callbacks
  disableBack?: boolean;
  disableContinue?: boolean;
  handleBack?: () => void;
  handleContinue?: () => void;
}

function Buttons({
  disableBack = false,
  disableContinue = false,
  handleBack,
  handleContinue,
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
      {!disableContinue && (
        <button
          onClick={handleContinue ? handleContinue : undefined}
          className={styles.continueBtn}
        >
          Continue
          <RightArrowIcon className={styles.icon} />
        </button>
      )}
    </div>
  );
}

export default Buttons;
