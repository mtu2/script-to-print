import React, { ReactElement, useCallback, useState } from "react";
import Buttons from "../Buttons/Buttons";

import { useDropzone } from "react-dropzone";
import { ReactComponent as DropHereIcon } from "../../icons/drop-here-48dp.svg";
import styles from "./ImageSelect.module.scss";

export interface ImageFile {
  type: "image/jpeg" | "image/png";
}

interface Props {
  handleContinue: (file: ImageFile) => void;
}

const action = (
  <>
    <DropHereIcon className={styles.icon} />
    <h2>
      <strong>1. Drag image here</strong> or <strong>select image</strong>
    </h2>
    <p>Maximum filesize: 4mb, Allowed files: .jpeg, .png</p>
  </>
);
const done = (
  <h2>
    <strong>Done!</strong> Upload received
  </h2>
);
const wrongFile = (
  <h2>
    <strong>Incompatible file!</strong> Please submit a .jpeg or .png
  </h2>
);

function ImageSelect(props: Props): ReactElement {
  const [file, setFile] = useState<ImageFile | null>(null);
  const [displayContent, setDisplayContent] = useState(action);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any): void => {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        // If file is not an image file
        console.log("wrong file type given");
        setDisplayContent(wrongFile);
        return;
      }

      setFile(file);
      setDisplayContent(done);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.imageSelect}>
      <div
        {...getRootProps()}
        className={`${styles.dropzoneRoot} ${
          isDragActive && styles.dragActive
        }`}
      >
        <input {...getInputProps()} />
        <div className={styles.dashedLine} />
        {displayContent}
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
