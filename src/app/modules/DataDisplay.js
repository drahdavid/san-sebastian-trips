import { useState } from "react";

import { CustomTable } from "../components/CustomTable";
import { Filters } from "../components/Filters";

import { styled } from "@mui/material";

export const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  return (
    <DataContainer>
      <Filters setData={setFilteredData} data={data} />
      <CustomTable setData={setData} data={filteredData || data} />
    </DataContainer>
  );
};

export const DataContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
}));
