import React from "react";

import { TextField, MenuItem } from "@mui/material";

export const CustomSelect = ({
  className,
  name,
  label,
  value,
  onChange,
  data,
}) => {
  return (
    <TextField
      className={className}
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
    >
      {data.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
