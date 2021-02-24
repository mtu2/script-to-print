import React, { ReactElement, useState } from "react";
import styles from "./Navbar.module.scss";
import Dialog from "@material-ui/core/Dialog";

interface InfoDialogProps {
  onClose: () => void;
  open: boolean;
}

function InfoDialog(props: InfoDialogProps): ReactElement {
  return (
    <Dialog
      onClose={() => props.onClose()}
      open={props.open}
      className={styles.infoDialog}
    >
      <div className={styles.info}>
        <h2>how to use?</h2>
        <p>
          script to print creates posters and wallpapers by imprinting and
          overlaying images on text
        </p>
        <p>
          to get started, <strong>1. find and upload an image</strong>, this
          should be as high definition as possible and in a .jpeg or .png
          format.
        </p>
        <p>
          next, <strong>2. enter text</strong>, you can either write this in
          yourself or simply copy and paste from another source. for example,
          for movie scripts you can copy and paste from{" "}
          <a href="https://imsdb.com/">imsdb.com</a>.
        </p>
        <p>
          lastly, <strong>3. edit settings</strong>, leave this as default if
          unsure.
        </p>
      </div>
    </Dialog>
  );
}

interface Props {
  onReset: () => void;
}

function Navbar(props: Props): ReactElement {
  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpen = () => {
    setOpenInfo(true);
  };

  const handleClose = () => {
    setOpenInfo(false);
  };

  return (
    <nav className={styles.nav}>
      <p className={styles.name} onClick={props.onReset}>
        script to print
      </p>
      <p className={styles.help} onClick={handleClickOpen}>
        how to use?
      </p>
      <InfoDialog open={openInfo} onClose={handleClose} />
    </nav>
  );
}

export default Navbar;
