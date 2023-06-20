import { Avatar, Box, Button, Grid, Tooltip, Typography } from "@mui/joy";
import { AppBar, Toolbar } from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface Props {
  data: Session | null;
}

export const Header = (props: Props) => {
  const { data } = props;
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <AppBar position="static" color="inherit" sx={{ borderRadius: 2 }}>
        <Toolbar>
          <Typography level="h6" fontWeight={'bold'} component="p" sx={{ flexGrow: 1 }}>
            Vendor Admin
          </Typography>
          <Tooltip
            sx={{
              background: (theme) => theme.palette.background.popup,
            }}
            title={
              <Grid direction={"column"} container gap={2} p={1}>
                <Typography level="body2">
                  Signed in as {data?.user?.name}
                </Typography>
                <Button
                  onClick={() => {
                    signOut();
                  }}
                  variant="solid"
                >
                  Sign out
                </Button>
              </Grid>
            }
          >
            {data?.user?.image ? (
              <Avatar src={data?.user?.image || ""} />
            ) : (
              <></>
            )}
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
