import { useState } from "react";
import { Checkbox as CheckboxMUI } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

export const Checkbox = ({ className, disabled, label, onChange }) => {
  return (
    <FormControlLabel
      disabled={disabled}
      className={className}
      control={
        <CheckboxMUI onChange={onChange} name="checked" color="primary" />
      }
      label={label}
    />
  );
};
