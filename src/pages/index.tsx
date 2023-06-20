import { ListVendors } from "@/components/ListVendors";
import { PageWrapper } from "@/components/PageWrapper";
import { Loader } from "@/components/UIHelpers/Loader";
import "@fontsource/public-sans";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import type { GetServerSideProps } from "next";

type Props = {
  count: number;
  data: any;
  page: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let dev = process.env.NODE_ENV !== "production";
  let { NEXTAUTH_URL, PROD_URL } = process.env;
  const limit = 5;
  let data = {};

  let count = await (
    await fetch(`${dev ? NEXTAUTH_URL : PROD_URL}/api/get-count`)
  ).json();
  if (context.query.skip == undefined) {
    data = await (
      await fetch(
        `${dev ? NEXTAUTH_URL : PROD_URL}/api/list?limit=${limit}&skip=0`
      )
    ).json();
  } else {
    const skip = context.query.skip;
    data = await (
      await fetch(
        `${dev ? NEXTAUTH_URL : PROD_URL}/api/list?limit=${limit}&skip=${skip}`
      )
    ).json();
  }

  return { props: { count, data, page: context.query.page || 1 } };
};

export default function Home({ count, data: vendorData, page }: Props) {
  const { data, status, update } = useSession();
  const router = useRouter();
  const limit = 5;
  useEffect(() => {
    if (!data) {
      router.push("/signin");
    }
  }, [status, count]);

  return status === "loading" && count ? (
    <Loader minHeight={200} />
  ) : (
    <PageWrapper headerdata={data}>
      <ListVendors
        pageCount={Math.ceil(count / limit)}
        limit={limit}
        vendors={vendorData}
        page={parseInt(page)}
      />
    </PageWrapper>
  );
}
