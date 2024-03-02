import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import "dayjs/locale/es"; // Import the Spanish locale

import { TextField } from "@mui/material";

export const CustomDatePicker = ({ value, onChange, label }) => {
  const minDate = dayjs().startOf("day");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        minDate={minDate}
      />
    </LocalizationProvider>
  );
};
