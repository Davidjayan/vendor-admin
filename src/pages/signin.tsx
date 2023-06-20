import { Container } from "@/components/UIHelpers/Container";
import { SignIn } from "@/components/SignIn";
import { Wrapper } from "@/components/UIHelpers/Wrapper";
import { Box, Card } from "@mui/joy";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default () => {
  const { data, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [status]);
  return (
    <Wrapper>
      <Box>
        <Container>
          <SignIn />
        </Container>
      </Box>
    </Wrapper>
  );
};
