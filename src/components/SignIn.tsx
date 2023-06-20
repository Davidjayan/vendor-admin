import { GoogleIcon } from "@/Icons/GoogleIcon";
import { Button, Grid, Typography } from "@mui/joy";
import { signIn } from "next-auth/react";
export const SignIn = () => {
  return (
    <Grid
      container
      direction={"column"}
      gap={10}
      sx={{ textAlign: "center", gap: 2 }}
    >
      <Typography variant="plain" level="display2">
        Welcome!!
      </Typography>
      <Typography>Sign in to continue</Typography>
      <Button
        onClick={() => {
          signIn("google");
        }}
        variant="outlined"
      >
        Sign in with Google &nbsp;&nbsp;
        <GoogleIcon width={20} height={20} />
      </Button>
    </Grid>
  );
};
