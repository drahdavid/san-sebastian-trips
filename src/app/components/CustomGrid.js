"use client";
import React from "react";
import { Typography, Grid, Button, styled } from "@mui/material";
import { MODE } from "../utils/constants";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export const CustomGrid = ({ onClick }) => {
  return (
    <CustomGridParentContainer
      sx={{ marginTop: "20px", justifyContent: "center", gap: 20 }}
      container
      spacing={2}
    >
      <CustomGridContainer item xs={4}>
        <CustomTypography variant="h5">
          Quiero agregar un Viaje
        </CustomTypography>
        <Button
          onClick={() => onClick(MODE.ADD)}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          Agregar Viaje
        </Button>
      </CustomGridContainer>
      <CustomGridContainer item xs={4}>
        <CustomTypography variant="h5">Quiero Buscar un Viaje</CustomTypography>
        <Button
          onClick={() => onClick(MODE.SEARCH)}
          startIcon={<SearchIcon />}
          variant="contained"
          color="secondary"
        >
          Buscar Viaje
        </Button>
      </CustomGridContainer>
    </CustomGridParentContainer>
  );
};

const CustomGridParentContainer = styled(Grid)(({ theme }) => ({
  marginTop: "20px",
  justifyContent: "center",
  gap: 20,
  [theme.breakpoints.down("md")]: {
    gap: 10,
    ".MuiButtonBase-root": {
      width: "100px",
      fontSize: "10px",
    },
  },
}));

const CustomGridContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 10,
  [theme.breakpoints.down("md")]: {
    gap: 20,
    display: "flex",
    alignItems: "center",
  },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "18px",
  },
}));
