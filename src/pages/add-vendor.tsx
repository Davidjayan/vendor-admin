import { CreateVendor } from "@/components/CreateVendor";
import { PageWrapper } from "@/components/PageWrapper";
import { useSession } from "next-auth/react";
import React from "react";

export default () => {
  const { data, status, update } = useSession();
  return (
    <PageWrapper headerdata={data}>
      <CreateVendor />
    </PageWrapper>
  );
};
