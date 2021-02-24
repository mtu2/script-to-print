import React, { ReactElement, useEffect, useState } from "react";
import styles from "./App.module.scss";

import ImageSelect, { ImageFile } from "./ImageSelect/ImageSelect";
import OptionSelect, {
  Options,
  DEFAULT_OPTIONS,
} from "./OptionSelect/OptionSelect";
import TextSelect from "./TextSelect/TextSelect";
import Download from "./Download/Download";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

function App(): ReactElement {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [text, setText] = useState("");
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [showComponent, setShowComponent] = useState("IMAGE_SELECT");

  useEffect(() => {
    // Sets vh css variable - used for mobile devices
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  function handleReset() {
    const isConfirmed = window.confirm(
      "Are you sure you want to reset your work?"
    );

    if (isConfirmed) {
      setImageFile(null);
      setText("");
      setOptions(DEFAULT_OPTIONS);
      setShowComponent("IMAGE_SELECT");
    }
  }

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
      <Navbar onReset={handleReset} />

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
      <Footer />
    </div>
  );
}

export default App;
