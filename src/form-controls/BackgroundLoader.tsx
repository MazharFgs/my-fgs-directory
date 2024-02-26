import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function BackgroundLoader() {
  //   const [open, setOpen] = React.useState(true);
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
