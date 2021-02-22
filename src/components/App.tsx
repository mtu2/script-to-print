import React, { ReactElement, useState } from "react";
import styles from "./App.module.scss";

import ImageSelect, { ImageFile } from "./ImageSelect/ImageSelect";
import OptionSelect, {
  Options,
  DEFAULT_OPTIONS,
} from "./OptionSelect/OptionSelect";
import TextSelect from "./TextSelect/TextSelect";
import Download from "./Download/Download";

function App(): ReactElement {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [text, setText] = useState("");
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [showComponent, setShowComponent] = useState("IMAGE_SELECT");

  function getComponent() {
    switch (showComponent) {
      case "IMAGE_SELECT":
        return (
          <ImageSelect
            imageFile={imageFile}
            handleContinue={(enteredFile: ImageFile): void => {
              setImageFile(enteredFile);
              setShowComponent("TEXT_SELECT");
            }}
          />
        );
      case "TEXT_SELECT":
        return (
          <TextSelect
            text={text}
            handleBack={(enteredText: string): void => {
              setText(enteredText);
              setShowComponent("IMAGE_SELECT");
            }}
            handleContinue={(enteredText: string): void => {
              setText(enteredText);
              setShowComponent("OPTION_SELECT");
            }}
          />
        );
      case "OPTION_SELECT":
        return (
          <OptionSelect
            options={options}
            handleBack={(enteredOptions: Options): void => {
              setOptions(enteredOptions);
              setShowComponent("TEXT_SELECT");
            }}
            handleContinue={(enteredOptions: Options): void => {
              setOptions(enteredOptions);
              setShowComponent("DOWNLOAD");
            }}
          />
        );
      case "DOWNLOAD":
        return (
          <Download
            imageFile={imageFile as ImageFile}
            text={text}
            options={options}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.app}>
      {/* Header */}
      <nav className={styles.nav}>
        <p className={styles.name}>script to print</p>
        <p className={styles.help}>how to use?</p>
      </nav>

      {/* Main */}
      <div className={styles.main}>
        <div className={styles.description}>
          <h1>Script to Print 🎞️</h1>
          <p>
            Create posters and wallpapers by combining your favourite movie
            scripts and images
          </p>
        </div>
        {getComponent()}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>Made by Michael</footer>
    </div>
  );
}

export default App;
