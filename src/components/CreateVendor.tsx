import { useSnackBar } from "@/utils/providers/AlertProvider";
import { Box, Typography } from "@mui/joy";
import { FormEvent } from "react";
import { useFetch } from "use-http";
import { FormData, VendorForm } from "./UIHelpers/VendorForm";
import { Loader } from "./UIHelpers/Loader";
import errorHandler from "@/utils/errorHandler";



export const CreateVendor = () => {
  const { alert } = useSnackBar();
  const { post, data: vendor, loading, error } = useFetch("/api/create-or-update");

  const handleSubmit = (
    formError: boolean,
    formData: FormData,
    e?: FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    if (!formError) {
      post({ ...formData }).then(() => {
        if (!loading && !error && vendor) {
          alert("Added Vendor", "success");
        } else if (error && !loading) {
          errorHandler(vendor, alert);
        }
      });
    } else {
      alert("Form contains errors", "error");
    }
  };

  return loading ? (
    <Loader minHeight={100} />
  ) : (
    <Box sx={{ paddingX: 5, py: 2 }}>
      <Typography level="body1" fontSize={20} mb={2} fontWeight={"bold"}>
        Create Vendor
      </Typography>
      <VendorForm handleSubmit={handleSubmit} />
    </Box>
  );
};
