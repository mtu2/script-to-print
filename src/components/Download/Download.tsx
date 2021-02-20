import React, { ReactElement, useEffect, useRef, useState } from "react";
import styles from "./Download.module.scss";
import { ImageFile } from "../ImageSelect/ImageSelect";
import { Options } from "../OptionSelect/OptionSelect";

interface Props {
  imageFile: ImageFile;
  text: string;
  options: Options;
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

function Download({ imageFile, text, options }: Props): ReactElement {
  const [created, setCreated] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (function loadImage() {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onload = (ev) => {
        // if ev.target.result is a HTMLImageElement
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
          drawCanvases(img);
        };
      };

      // Read in data url of imageFile
      reader.readAsDataURL(imageFile as Blob);
    })();

    function drawCanvases(img: HTMLImageElement) {
      const imgCanvas = imgCanvasRef.current;
      const textCanvas = textCanvasRef.current;

      if (!imgCanvas || !textCanvas) {
        // if either ref is null
        return;
      }

      const imgCtx = imgCanvas.getContext("2d") as CanvasRenderingContext2D;
      const textCtx = textCanvas.getContext("2d") as CanvasRenderingContext2D;

      const width = img.width * options.scaleFactor;
      const height = img.height * options.scaleFactor;

      // Set width and height of canvases
      textCanvas.hidden = imgCanvas.hidden = true;
      textCanvas.width = imgCanvas.width = width;
      textCanvas.height = imgCanvas.height = height;

      // Draw image on image canvas
      drawImgCanvas(imgCtx, img, width, height);

      // Draw text on text canvas
      drawTextCanvas(textCtx, width, height);

      // Create print from image and text canvas
      createPrint(imgCtx, textCtx, width, height);

      // Set download link
      setCreated(true);
      console.log(imgCanvas.toDataURL("image/png"));
      setDownloadLink(imgCanvas.toDataURL("image/png"));
    }

    function drawImgCanvas(
      imgCtx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      width: number,
      height: number
    ): void {
      // Draw image on image canvas
      imgCtx.drawImage(img, 0, 0, width, height);
    }

    function drawTextCanvas(
      textCtx: CanvasRenderingContext2D,
      width: number,
      height: number
    ): void {
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
    }

    function createPrint(
      imgCtx: CanvasRenderingContext2D,
      textCtx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) {
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
  }, [imageFile, text, options]);

  return (
    <div className={styles.download}>
      <div className={styles.downloadContainer}>
        {created && downloadLink ? (
          <h2>
            <a href={downloadLink} download="script-to-print">
              Download
            </a>
          </h2>
        ) : (
          <h2>Generating...</h2>
        )}
      </div>

      <canvas ref={imgCanvasRef}></canvas>
      <canvas ref={textCanvasRef}></canvas>
    </div>
  );
}

export default Download;
