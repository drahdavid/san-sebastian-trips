"use client";
import React from "react";
import { Typography, Grid, Button, styled } from "@mui/material";
import { MODE } from "../utils/constants";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export const CustomGrid = ({ onClick }) => {
  return (
    <Grid
      sx={{ marginTop: "20px", justifyContent: "center", gap: 20 }}
      container
      spacing={2}
    >
      <CustomGridContainer item xs={4}>
        <Typography variant="h5">Quiero agregar un Viaje</Typography>
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
        <Typography variant="h5">Quiero Buscar un Viaje</Typography>
        <Button
          onClick={() => onClick(MODE.SEARCH)}
          startIcon={<SearchIcon />}
          variant="contained"
          color="secondary"
        >
          Buscar Viaje
        </Button>
      </CustomGridContainer>
    </Grid>
  );
};

const CustomGridContainer = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 10,
}));
