import React, { ReactElement, useEffect, useRef, useState } from "react";
import styles from "./Download.module.scss";
import { ImageFile } from "../ImageSelect/ImageSelect";
import { Options } from "../OptionSelect/OptionSelect";
import { processText } from "../../utils/text";

interface Props {
  imageFile: ImageFile;
  text: string;
  options: Options;
}

function Download({ imageFile, text, options }: Props): ReactElement {
  const [created, setCreated] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const downloadAnchorRef = useRef<HTMLAnchorElement>(null);
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (function loadImage(): void {
      // console.time("Create print");
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

    function drawCanvases(img: HTMLImageElement): void {
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
      const processedText = processText(text, options.capitalise);

      // Set background white
      textCtx.fillStyle = "#ffffff"; //white
      textCtx.fillRect(0, 0, width, height);

      // Set font styling
      textCtx.font = `400 ${options.fontSize}px ${options.font}`; // USE OPTIONS
      textCtx.fillStyle = "rgb(0, 0, 0)";

      // Set empty char width dictionary
      const charWidthDict: {
        [key: string]: number;
      } = {};

      // Set loop variables
      let start = 0;
      let curr = 0;
      let filledHeight = options.fontSize;

      while (filledHeight < height) {
        // Set line variables
        let line = "";
        let lineWidth = 0;
        let isDone = false;

        while (!isDone) {
          const char = processedText[curr];

          // Add to width of char to dictionary if doesn't exist
          if (!charWidthDict.hasOwnProperty(char)) {
            charWidthDict[char] = textCtx.measureText(char).width;
          }

          // Add char width to line (doesn't account for kerning)
          lineWidth += charWidthDict[char];

          // If current index is greater than length of text
          if (curr + 1 >= processedText.length) {
            line += processedText.substring(start, curr);
            start = curr = 0;
          } else {
            curr++;
          }

          // If calculated line width is larger than width of canvas (+ 75px)
          if (lineWidth >= width + 75) {
            line += processedText.substring(start, curr);
            start = curr;

            // Check if actual line width (accounts for kerning) is larger than canvas width
            const actualLineWidth = textCtx.measureText(line).width;

            if (actualLineWidth > width) {
              // If yes, exit loop
              isDone = true;
            } else {
              // If not, set calculated line width to actual and continue
              lineWidth = actualLineWidth;
            }
          }
        }

        // Add line to text canvas and adjust filled height
        textCtx.fillText(line, 0, filledHeight);
        filledHeight += options.fontSize;
      }
    }

    function createPrint(
      imgCtx: CanvasRenderingContext2D,
      textCtx: CanvasRenderingContext2D,
      width: number,
      height: number
    ): void {
      // Get pixel data for both canvases
      const imgData = imgCtx.getImageData(0, 0, width, height);
      const textData = textCtx.getImageData(0, 0, width, height);

      const imgPixels = imgData.data;
      const textPixels = textData.data;

      for (let i = 0; i < imgPixels.length; i += 4) {
        // If pixel on text canvas is white, set pixel on img canvas to white
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
      // Put updated pixel data on img canvas
      imgCtx.putImageData(imgData, 0, 0);
      // console.timeEnd("Create print");
    }
  }, [imageFile, text, options]);

  useEffect(() => {
    // Start auto download
    if (downloadAnchorRef.current) {
      console.log("auto download");
      downloadAnchorRef.current.click();
    }
  }, [downloadLink]);

  return (
    <div className={styles.download}>
      <div className={styles.mainContainer}>
        {created && downloadLink ? (
          <div className={styles.doneContainer}>
            <h2 className={styles.title}>
              <strong>Done!</strong> Print created
            </h2>
            <p className={styles.subtitle}>
              If you're download doesn't start automatically{" "}
              <a
                ref={downloadAnchorRef}
                href={downloadLink}
                download="script-to-print"
              >
                click here
              </a>
            </p>
          </div>
        ) : (
          <div className={styles.generatingContainer}>
            <h2 className={styles.title}>Generating...</h2>
          </div>
        )}
      </div>

      <canvas ref={imgCanvasRef}></canvas>
      <canvas ref={textCanvasRef}></canvas>
    </div>
  );
}

export default Download;
