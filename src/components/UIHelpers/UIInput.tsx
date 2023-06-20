import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@mui/joy";
import React, { useEffect, useState } from "react";

interface Props {
  label: string;
  placeholder?: string;
  onChange?: (e: {
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>;
    setError: (e: boolean) => void;
    setHelperText: (e: string) => void;
  }) => void;
  error?: boolean;
  helperText?: string;
  minRows?: number;
  required?: boolean;
  value: any;
}

export const UIInput = (props: Props) => {
  const { label, required, onChange, placeholder, minRows, value } = props;
  const [error, setError] = useState<boolean>();
  const [helperText, setHelperText] = useState<string>();
  return (
    <FormControl id="Id" required={required} size="md" error={error}>
      <FormLabel>{label}</FormLabel>
      {minRows ? (
        <Textarea
          placeholder={placeholder}
          name={label}
          value={value}
          slotProps={{ textarea: { sx: { outlineColor: "red" } } }}
          autoComplete="on"
          autoFocus
          minRows={minRows}
          error={error}
          variant="outlined"
          onChange={(e) => onChange && onChange({ e, setError, setHelperText })}
        />
      ) : (
        <Input
          placeholder={placeholder}
          name={label}
          type="text"
          autoComplete="on"
          value={value}
          autoFocus
          fullWidth
          error={error}
          onChange={(e) => onChange && onChange({ e, setError, setHelperText })}
          variant="outlined"
        />
      )}
      {error && helperText && (
        <FormHelperText id="Id-helper-text">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
