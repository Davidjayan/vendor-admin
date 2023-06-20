import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const AlertContext = createContext({
  alert: (message: string, severity: AlertColor) => {},
});

interface Props {
  children: any;
}

export const AlertProvider = (props: Props) => {
  const [options, setOptions] = useState<{
    message: string;
    severity: AlertColor;
  }>();
  const [open, setOpen] = useState<boolean>(false);

  const alert = (message: string, severity: AlertColor) => {
    setOpen(true);
    setOptions({
      message,
      severity,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <AlertContext.Provider
      value={{
        alert,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={options?.severity}
          sx={{ width: "100%" }}
        >
          {options?.message}
        </Alert>
      </Snackbar>
      {props.children}
    </AlertContext.Provider>
  );
};

export const useSnackBar = () => useContext(AlertContext);
