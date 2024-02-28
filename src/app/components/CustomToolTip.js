import React from "react";

import { Tooltip, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const CustomToolTip = ({ className, title }) => (
  <Tooltip color="red" className={className} title={title}>
    <IconButton>
      <InfoIcon color="inherit" fontSize="small" />
    </IconButton>
  </Tooltip>
);
