import { Autocomplete, FormControl, FormHelperText, FormLabel } from "@mui/joy";
import React, { useEffect, useState } from "react";
import country from "@/utils/country/index";
interface Props {
  error?: boolean;
  helperText?: string;
  value: any;
  onChange: (e: React.SyntheticEvent<Element, Event>, value: any) => void;
}
export const CountrySelector = (props: Props) => {
  const { error, helperText, onChange, value } = props;
  const countryList: any = country;
  useEffect(() => {
    console.log("asjdhkajs",value);
  }, [value]);
  return (
    <FormControl id="Id" required size="md">
      <FormLabel>Country</FormLabel>
      <Autocomplete
        placeholder={"Country"}
        options={Object.keys(country)}
        value={value == "" ? null : value}
        getOptionLabel={(option) => countryList[option]?.name}
        startDecorator={countryList[value]?.emoji}
        sx={{ width: "100%", flexGrow: 1 }}
        onChange={onChange}
      />
      {error && helperText && (
        <FormHelperText id="Id-helper-text">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
