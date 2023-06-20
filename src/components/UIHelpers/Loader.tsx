import { Box, CircularProgress } from "@mui/joy";
import React from "react";
import { Container } from "./Container";

interface Props {
  minHeight: string | number;
}
export const Loader = (props: Props) => {
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: props.minHeight,
          display: "flex",
          zIndex: 1111,
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.2,
        }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};
