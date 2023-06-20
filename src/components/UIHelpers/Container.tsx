import { Box, Card, CardContent } from "@mui/joy";
import React from "react";

export const Container = (props: { children: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
        flexGrow: 1,
      }}
    >
      <Card
        sx={{
          width: "100%"
        }}
        variant="outlined"
      >
        <CardContent>{props?.children}</CardContent>
      </Card>
    </Box>
  );
};
