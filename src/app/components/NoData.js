import React from "react";
import { Box, Typography, Paper, styled } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export const NoData = ({ message = "No se encontraron resultados" }) => {
  return (
    <Box
      sx={{ margin: "auto" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SentimentDissatisfiedIcon fontSize="large" color="action" />
        <Typography variant="subtitle1">{message}</Typography>
      </Paper>
    </Box>
  );
};
