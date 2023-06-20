import { PageWrapper } from "@/components/PageWrapper";
import { Loader } from "@/components/UIHelpers/Loader";
import { FormData, VendorForm } from "@/components/UIHelpers/VendorForm";
import errorHandler from "@/utils/errorHandler";
import { useSnackBar } from "@/utils/providers/AlertProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useFetch } from "use-http";

export default () => {
  const { get, error, loading } = useFetch("/api/get");
  const {
    post,
    data: vendor,
    loading: editreqLoading,
    error: editReqError,
  } = useFetch("/api/create-or-update");


  const { alert } = useSnackBar();
  const { data, status, update } = useSession();
  const [vendorInfo, setVendorInfo] = useState<any>();
  const router = useRouter();


  useEffect(() => {
    if (router?.isReady) {
      get(`?_id=${router.query._id}`).then((value) => {
        if (!loading && value) {
          setVendorInfo(value);
        }
      });
    }
  }, [router.isReady]);

  const handleSubmit = (
    formError: boolean,
    formData: FormData,
    e?: FormEvent<HTMLFormElement>
  ) => {
    console.log('asdjhk');
    
    e?.preventDefault();
    if (!formError) {
      post({ ...formData, _id: router.query._id }).then(() => {
        if (!editreqLoading && !editReqError && vendor) {
          alert("Added Vendor", "success");
        } else if (error && !loading) {
          errorHandler(vendor, alert);
        }
      });
    } else {
      alert("Form contains errors", "error");
    }
  };

  return (
    <PageWrapper headerdata={data}>
      {loading && <Loader minHeight={100} />}
      {!loading && vendorInfo && (
        <VendorForm handleSubmit={handleSubmit} defaultValue={vendorInfo} />
      )}
    </PageWrapper>
  );
};
