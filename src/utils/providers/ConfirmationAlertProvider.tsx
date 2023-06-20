import { Button, CardContent, Grid, Modal, ModalDialog } from "@mui/joy";
import { CardActions, Fade } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ConfirmationAlertContext = createContext({
  confirmationAlert: (
    message: string,
    onYes?: () => Promise<any>,
    onNo?: () => Promise<any>
  ) => {},
});

interface Props {
  children: any;
}

export const ConfimationAlertProvider = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [callBacks, setCallBacks] = useState<any>({});

  const confirmationAlert = (
    message: string,
    onYes?: () => Promise<any>,
    onNo?: () => Promise<any>
  ) => {
    setOpen(true);
    setMessage(message);
    onYes && onNo && setCallBacks({ ...callBacks, onYes, onNo });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ConfirmationAlertContext.Provider
      value={{
        confirmationAlert,
      }}
    >
      <Modal
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <ModalDialog layout="center">
            <Grid container direction={"column"}>
              <CardContent sx={{ mb: 2 }}>{message}</CardContent>
              <CardActions
                sx={{
                  flexDirection: "row-reverse",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  sx={{ ml: 2 }}
                  onClick={() => {
                    callBacks.onNo !== undefined &&
                      callBacks.onNo().then(() => {
                        setOpen(false);
                      });
                  }}
                >
                  No
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    callBacks.onYes !== undefined &&
                      callBacks.onYes().then(() => {
                        setOpen(false);
                      });
                  }}
                >
                  Yes
                </Button>
              </CardActions>
            </Grid>
          </ModalDialog>
        </Fade>
      </Modal>

      {props.children}
    </ConfirmationAlertContext.Provider>
  );
};

export const useConfirmationAlert = () => useContext(ConfirmationAlertContext);
