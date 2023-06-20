import { Box } from "@mui/joy";
import React from "react";

export const Wrapper = (props: { children: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      {props?.children}
    </Box>
  );
};
