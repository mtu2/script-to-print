import React, { ReactElement, useCallback, useState } from "react";
import Buttons from "../UI/Buttons/Buttons";

import { FileWithPath, useDropzone } from "react-dropzone";
import styles from "./ImageSelect.module.scss";
import { ReactComponent as DropHereIcon } from "../../icons/drop-here-48dp.svg";
import { ReactComponent as PhotoIcon } from "../../icons/photo-white-48dp.svg";

export interface ImageFile {
  type: "image/jpeg" | "image/png";
}

interface ImageFileInfo {
  name: string;
  sizeMb: string;
}

interface Props {
  imageFile: ImageFile | null;
  handleContinue: (file: ImageFile) => void;
}

function getFileInfo(file: FileWithPath | null): ImageFileInfo | null {
  if (!file) return null;

  return {
    name: file.name,
    sizeMb: `${(file.size / 1000000).toFixed(2)}mb`,
  };
}

function ImageSelect(props: Props): ReactElement {
  const [file, setFile] = useState<ImageFile | null>(props.imageFile);
  const [fileInfo, setFileInfo] = useState<ImageFileInfo | null>(
    getFileInfo(props.imageFile as FileWithPath)
  );
  const [displayContent, setDisplayContent] = useState(
    props.imageFile ? "DONE" : "ACTION"
  );

  const onDrop = useCallback((files: FileWithPath[]): void => {
    files.forEach((file: FileWithPath): void => {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        // If file is not an image file
        setDisplayContent("WRONG_FILE");
        return;
      }

      setFile(file as ImageFile);
      setFileInfo(getFileInfo(file));
      setDisplayContent("DONE");
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function getContent() {
    switch (displayContent) {
      case "ACTION":
        return (
          <div className={styles.actionContainer}>
            <DropHereIcon className={styles.dropHereIcon} />
            <h2 className={styles.title}>
              <strong>1. Drag image here</strong> or{" "}
              <strong>select image</strong>
            </h2>
            <p className={styles.subtitle}>Allowed files: .jpeg, .png</p>
          </div>
        );
      case "DONE":
        return (
          <div className={styles.doneContainer}>
            <h2 className={styles.title}>
              <strong>Done!</strong> Upload received
            </h2>
            <div className={styles.fileInfoContainer}>
              <PhotoIcon className={styles.photoIcon} />
              <p className={styles.fileName}>{fileInfo?.name}</p>
              <p className={styles.fileSize}>{fileInfo?.sizeMb}</p>
            </div>
          </div>
        );
      case "WRONG_FILE":
        return (
          <div className={styles.wrongFileContainer}>
            <h2 className={styles.title}>
              <strong>Incompatible file!</strong> Please submit a .jpeg or .png
            </h2>
          </div>
        );
    }
  }

  return (
    <div className={styles.imageSelect}>
      <div
        {...getRootProps()}
        className={`${styles.mainContainer} ${
          isDragActive && styles.dragActive
        }`}
      >
        <input {...getInputProps()} />
        <div className={styles.dashedLine} />
        {getContent()}
      </div>
      {file && (
        <Buttons
          handleContinue={() => props.handleContinue(file)}
          disableBack
        />
      )}
    </div>
  );
}

export default ImageSelect;
