import React, { ReactElement, useEffect, useRef } from "react";
import styles from "./Download.module.scss";
import { ImageFile } from "../ImageSelect/ImageSelect";
import { Options } from "../OptionSelect/OptionSelect";

interface Props {
  imageFile: ImageFile;
  text: string;
  options: Options;
}

interface PrintElements extends Props {
  imgCanvas: HTMLCanvasElement;
  textCanvas: HTMLCanvasElement;
}

function processText(text: string, capitalise = false): string {
  // capitalise and remove additional whitespace
  // const processed = text.toUpperCase().replace(/\s+/g, " ");
  let processed = text.replace(/\s+/g, " ");
  if (capitalise) {
    processed = processed.toUpperCase();
  }

  return processed;
}

function createPrint({
  imageFile,
  text,
  options,
  imgCanvas,
  textCanvas,
}: PrintElements): void {}

function Download({ imageFile, text, options }: Props): ReactElement {
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // CREATE IMAGE CANVAS
    const reader = new FileReader();

    reader.onabort = () => console.log("File reading was aborted");
    reader.onerror = () => console.log("File reading has failed");
    // equivalent to reader.addEventListener("onload", (ev) => ...)
    reader.onload = (ev) => {
      if (
        ev.target == null ||
        ev.target.result == null ||
        ev.target.result instanceof ArrayBuffer
      ) {
        return;
      }

      const img = new Image();
      img.src = ev.target.result;

      img.onload = () => {
        const width = img.width * options.scaleFactor;
        const height = img.height * options.scaleFactor;

        const imgCanvas = imgCanvasRef.current;
        const textCanvas = textCanvasRef.current;

        if (imgCanvas && textCanvas) {
          const imgCtx = imgCanvas.getContext("2d") as CanvasRenderingContext2D;

          imgCanvas.width = width;
          imgCanvas.height = height;
          textCanvas.hidden = true;

          imgCtx.drawImage(img, 0, 0, width, height);

          // CREATE TEXT CANVAS
          const textCtx = textCanvas.getContext(
            "2d"
          ) as CanvasRenderingContext2D;

          textCanvas.width = width;
          textCanvas.height = height;

          // DRAW TEXT CANVAS
          // Draw entered text on canvas with given width and height
          const processedText = processText(text);

          // Set background white
          textCtx.fillStyle = "#ffffff"; //white
          textCtx.fillRect(0, 0, width, height);

          // Set font styling
          textCtx.font = `400 18px EB Garamond`; // USE OPPTIONS
          textCtx.fillStyle = "rgb(0, 0, 0)";

          let i = 0;
          let filledHeight = 18;

          let lineCount = 0;
          let avgLineChars = 0;

          while (filledHeight < height) {
            let line = processedText.substring(
              i,
              i + Math.min(0, avgLineChars - 50)
            );

            while (textCtx.measureText(line).width < width) {
              line += processedText[i];

              if (i + 1 > processedText.length) i = 0;
              else i++;
            }

            textCtx.fillText(line, 0, filledHeight);
            filledHeight += 18; //LINE_HEIGHT = 18

            lineCount++;
            avgLineChars = Math.round(
              (avgLineChars * lineCount + line.length) / (lineCount + 1)
            );
          }

          // CREATE PRINT
          const imgData = imgCtx.getImageData(0, 0, width, height);
          const textData = textCtx.getImageData(0, 0, width, height);

          const imgPixels = imgData.data;
          const textPixels = textData.data;

          for (let i = 0; i < imgPixels.length; i += 4) {
            if (
              textPixels[i] === 255 &&
              textPixels[i + 1] === 255 &&
              textPixels[i + 2] === 255
            ) {
              imgPixels[i] = 255; // red
              imgPixels[i + 1] = 255; // green
              imgPixels[i + 2] = 255; // blue
              // i + 3 is alpha (the fourth element)
            }
          }

          imgCtx.putImageData(imgData, 0, 0);
        }
      };
    };

    reader.readAsDataURL(imageFile as Blob);
  }, [imageFile, text, options]);

  return (
    <div className={styles.download}>
      <div className={styles.downloadContainer}>
        <h2>Download</h2>
      </div>

      <canvas ref={imgCanvasRef}></canvas>
      <canvas ref={textCanvasRef}></canvas>
    </div>
  );
}

export default Download;
