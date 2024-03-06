import React, { useState, useEffect, useCallback } from "react";
import { TextField, Button, styled } from "@mui/material";

import { CustomDatePicker } from "./CustomDatePicker";
import { CustomSelect } from "./CustomSelect";

import { DEPARTURE_LOCATIONS } from "../utils/constants";
import { getDayName } from "../utils";

import dayjs from "dayjs";
import "dayjs/locale/es";

export const Filters = ({ data, setData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filterData = useCallback(() => {
    let filtered = data;

    if (selectedDate) {
      filtered = filtered.filter(
        (item) =>
          dayjs(item.fecha).format("YYYY-MM-DD") ===
            dayjs(selectedDate).format("YYYY-MM-DD") ||
          (item.esRecurrente &&
            getDayName(item.fecha) === getDayName(selectedDate))
      );
    }
    if (selectedLocation) {
      filtered = filtered.filter(
        (item) => item.saliendoDesde === selectedLocation
      );
    }
    setData(filtered);
  }, [data, selectedDate, selectedLocation, setData]);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleCleanFilters = () => {
    setSelectedDate(null);
    setSelectedLocation(null);
    setData(null);
  };

  const minDate = dayjs().startOf("day");

  useEffect(() => {
    filterData();
  }, [selectedDate, selectedLocation, filterData]);

  return (
    <FilterContainer>
      <CustomDatePicker
        label="Filtrar por fecha"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        minDate={minDate}
      />
      <CustomizedSelect
        value={selectedLocation}
        label="Filtrar por ubicación"
        data={DEPARTURE_LOCATIONS}
        onChange={handleLocationChange}
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

export const FilterContainer = styled("div")(({ theme }) => ({
  marginTop: "50px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  minHeight: "50px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 15,
  },
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  height: "55px",
  [theme.breakpoints.down("sm")]: {
    width: "250px",
    fontSize: "12px",
  },
}));

export const CustomizedSelect = styled(CustomSelect)(({ theme }) => ({
  width: "200px",
  height: "55px",
  margin: 0,
  [theme.breakpoints.down("sm")]: {
    width: "250px",
  },
}));
