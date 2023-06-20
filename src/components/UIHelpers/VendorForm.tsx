import { Box, Button, FormControl } from "@mui/joy";
import React, { FormEvent, useEffect, useState } from "react";
import { UIInput } from "./UIInput";
import { regexValidation } from "@/utils/validators";
import { CountrySelector } from "./CountrySelector";

export type FormData = {
  vendorName: string;
  bankAccNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  zipCode: string;
};

interface Props {
  handleSubmit: (
    formError: boolean,
    formData: FormData,
    e?: FormEvent<HTMLFormElement>
  ) => void;
  defaultValue?: FormData;
}
export const VendorForm = (props: Props) => {
  const { handleSubmit, defaultValue } = props;

  const [formData, setFormData] = useState<FormData>({
    addressLine1: "",
    bankAccNo: "",
    bankName: "",
    city: "",
    country: "",
    vendorName: "",
    zipCode: "",
  });

  const [formError, setFormError] = useState<boolean>(false);

  const handleForm = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    if (defaultValue) {
      setFormData(defaultValue);
      console.log(defaultValue.country);
      
    }
  }, [defaultValue]);

  return (
    <Box>
      <FormControl
        component={"form"}
        onSubmit={(e) => handleSubmit(formError, formData, e)}
      >
        <UIInput
          onChange={({ e, setError, setHelperText }) => {
            let error = regexValidation({
              value: e.target.value,
              pattern: /^[A-Za-z\s]*$/,
              setFormError,
            });
            setError(error);
            if (error) {
              setHelperText("Only alphabets and spaces are allowed");
            } else {
              handleForm("vendorName", e.target.value);
            }
          }}
          value={formData?.vendorName}
          required
          label="Vendor name"
        />
        <UIInput
          required
          label="Bank Account No."
          value={formData?.bankAccNo}
          onChange={({ e, setError, setHelperText }) => {
            let error = regexValidation({
              value: e.target.value,
              pattern: /^[0-9]*$/,
              setFormError,
            });
            setError(error);
            if (error) {
              setHelperText("Only numbers are allowed");
            } else {
              handleForm("bankAccNo", e.target.value);
            }
          }}
        />
        <UIInput
          required
          label="Bank name"
          value={formData?.bankName}
          onChange={({ e, setError, setHelperText }) => {
            let error = regexValidation({
              value: e.target.value,
              pattern: /^[A-Za-z\s]*$/,
              setFormError,
            });
            setError(error);
            if (error) {
              setHelperText("Only alphabets and spaces are allowed");
            } else {
              handleForm("bankName", e.target.value);
            }
          }}
        />
        <UIInput
          required
          value={formData?.addressLine1}
          label="Address Line 1"
          onChange={({ e }) => {
            handleForm("addressLine1", e.target.value);
          }}
          minRows={3}
        />
        <UIInput
          label="Address Line 2"
          value={formData?.addressLine2}
          minRows={3}
          onChange={({ e }) => {
            handleForm("addressLine2", e.target.value);
          }}
        />
        <UIInput
          required
          label="City"
          value={formData?.city}
          onChange={({ e, setError, setHelperText }) => {
            let error = regexValidation({
              value: e.target.value,
              pattern: /^[A-Za-z\s]*$/,
              setFormError,
            });
            setError(error);
            if (error) {
              setHelperText("Only alphabets and spaces are allowed");
            } else {
              handleForm("city", e.target.value);
            }
          }}
        />
        <CountrySelector
          value={formData?.country}
          onChange={(e, value) => {
            handleForm("country", value);
          }}
        />
        <UIInput
          label="Zip code"
          value={formData?.zipCode}
          onChange={({ e, setError, setHelperText }) => {
            let error = regexValidation({
              value: e.target.value,
              pattern: /^[0-9]*$/,
              setFormError,
            });
            setError(error);
            if (error) {
              setHelperText("Only numbers are allowed");
            } else {
              handleForm("zipCode", e.target.value);
            }
          }}
        />
        <Button sx={{ my: 5 }} type="submit">
          SUBMIT
        </Button>
      </FormControl>
    </Box>
  );
};
