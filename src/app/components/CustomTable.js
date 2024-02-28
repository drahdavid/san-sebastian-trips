"use client";
import { useEffect, useState } from "react";

import { Loader } from "../components/Loader";
import { CustomToolTip } from "../components/CustomToolTip";

import { WHATSAPP_LINK } from "../utils/constants";

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";

import Link from "next/link";

export const CustomTable = () => {
  const [data, setData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const getDbData = async () => {
    const response = await fetch("/api/trips");
    const data = await response.json();

    setData(data);

    setIsLoadingData(false);
  };

  useEffect(() => {
    getDbData();
  }, []);

  return isLoadingData ? (
    <Loader />
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <CustomTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#2d2d2d" }}>
            <TableRow>
              <TableCell variant="head" align="center">
                Fecha
              </TableCell>
              <TableCell variant="head" align="center">
                Saliendo Desde
              </TableCell>
              <TableCell variant="head" align="center">
                Salida Precisa
              </TableCell>
              <TableCell variant="head" align="center">
                Destino
              </TableCell>
              <TableCell variant="head" align="center">
                Horario
              </TableCell>
              <TableCell variant="head" align="center">
                Asientos
              </TableCell>
              <TableCell variant="head" align="center">
                Costo por asiento
              </TableCell>
              <TableCell variant="head" align="center">
                Teléfono
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((row) => {
                const splittedDate = row.date.split("-");
                const formattedDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {formattedDate}
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.leavingFrom}
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.exactDeparture}
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.to}
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.departureTime} hs
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.seatQuantity}
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      ${row.seatPrice}
                    </TableCell>
                    <TableCell
                      variant="footer"
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <CustomLink
                        target="_blank"
                        href={`${WHATSAPP_LINK}${row.contactPhone}`}
                      >
                        +54 9 {row.contactPhone}
                      </CustomLink>
                      {row.comment && <CustomizedToolTip title={row.comment} />}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </Box>
  );
};

const CustomTableContainer = styled(TableContainer)(() => ({
  position: "relative",
  color: "white",
  display: "flex",
  justifyContent: "center",
  background: "#000401a1",
  width: "90%",
  ".MuiTableCell-root": {
    color: "white",
  },
}));

const CustomLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
  ":hover": {
    transition: "0.5s",
    color: "pink",
  },
}));

const CustomizedToolTip = styled(CustomToolTip)(() => ({
  color: "white",
  position: "relative",
  left: "1vw",
}));
