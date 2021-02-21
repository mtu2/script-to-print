import React, { ReactElement, useState } from "react";
import styles from "./App.module.scss";

import ImageSelect, { ImageFile } from "./ImageSelect/ImageSelect";
import OptionSelect, { Options } from "./OptionSelect/OptionSelect";
import TextSelect from "./TextSelect/TextSelect";
import Download from "./Download/Download";

function App(): ReactElement {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [text, setText] = useState("");
  const [options, setOptions] = useState<Options | null>(null);
  const [showComponent, setShowComponent] = useState("IMAGE_SELECT");

  function getComponent() {
    switch (showComponent) {
      case "IMAGE_SELECT":
        return (
          <ImageSelect
            handleContinue={(enteredFile: ImageFile) => {
              setImageFile(enteredFile);
              setShowComponent("TEXT_SELECT");
            }}
          />
        );
      case "TEXT_SELECT":
        return (
          <TextSelect
            handleBack={() => {
              setShowComponent("IMAGE_SELECT");
            }}
            handleContinue={(enteredText: string) => {
              setText(enteredText);
              setShowComponent("OPTION_SELECT");
            }}
          />
        );
      case "OPTION_SELECT":
        return (
          <OptionSelect
            handleBack={() => {
              setShowComponent("TEXT_SELECT");
            }}
            handleContinue={(enteredOptions: Options) => {
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
            options={options as Options}
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
