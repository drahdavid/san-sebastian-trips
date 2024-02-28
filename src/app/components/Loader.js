import React from "react";

import { Box, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height={"20vw"}
  >
    <CircularProgress />
  </Box>
);
