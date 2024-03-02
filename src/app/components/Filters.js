import React, { useState } from "react";
import { TextField, Button, styled } from "@mui/material";

import { CustomDatePicker } from "./CustomDatePicker";

import dayjs from "dayjs";
import "dayjs/locale/es"; // Import the Spanish locale

export const Filters = ({ data, setData }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    const filtered = data.filter(
      (item) =>
        dayjs(item.fecha).format("YYYY-MM-DD") ===
        dayjs(newValue).format("YYYY-MM-DD")
    );
    setData(filtered);
  };

  const handleCleanFilters = () => {
    setSelectedDate(null);
    setData(null);
  };

  const minDate = dayjs().startOf("day");

  return (
    <FilterContainer>
      <CustomDatePicker
        label="Filtrar por fecha"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        minDate={minDate}
      />
      <CustomButton
        color="warning"
        onClick={handleCleanFilters}
        variant="outlined"
      >
        Limpiar Filtro
      </CustomButton>
    </FilterContainer>
  );
};

export const FilterContainer = styled("div")(() => ({
  marginTop: "50px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const CustomButton = styled(Button)(() => ({
  height: "55px",
}));
