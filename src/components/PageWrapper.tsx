import { Box, Grid } from "@mui/joy";
import React from "react";
import { Header } from "./Header";
import { Container } from "./UIHelpers/Container";

interface Props {
  children: any;
  headerdata: any;
}

export const PageWrapper = (props: Props) => {
  const { children, headerdata } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Grid
        direction={"column"}
        sx={{ width: { md: "70%", xs: "100%" } }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Header data={headerdata} />
        <Container>
          <Box>{children}</Box>
        </Container>
      </Grid>
    </Box>
  );
};
