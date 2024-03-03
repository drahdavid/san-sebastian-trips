"use client";
import { useCallback, useEffect, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

import { Loader } from "./Loader";
import { CustomToolTip } from "./CustomToolTip";
import { CardMobile } from "./CardMobile";
import { NoData } from "./NoData";

import { WHATSAPP_LINK } from "../utils/constants";
import { currencyFormat } from "../utils";

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

export const CustomTable = ({ setData, data }) => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const isMobile = useIsMobile();

  const getDbData = useCallback(async () => {
    const response = await fetch("/api/trips");
    const data = await response.json();

    setData(data);

    setIsLoadingData(false);
  }, [setData]);

  useEffect(() => {
    getDbData();
  }, [getDbData]);

  const sortedAndFilteredData = data
    .filter((item) => new Date(item.fecha) > new Date())
    .sort((itemA, itemB) => new Date(itemA.fecha) - new Date(itemB.fecha));

  return isLoadingData ? (
    <Loader />
  ) : !sortedAndFilteredData.length ? (
    <NoData />
  ) : (
    <CustomBox>
      {isMobile ? (
        sortedAndFilteredData.map((data) => (
          <CardMobile key={data.id} tripData={data} />
        ))
      ) : (
        <CustomTableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#2d2d2d" }}>
              <TableRow>
                <TableCell variant="head" align="center">
                  Fecha
                </TableCell>
                <TableCell variant="head" align="center">
                  Horario
                </TableCell>
                <TableCell variant="head" align="center">
                  Saliendo Desde
                </TableCell>
                <TableCell variant="head" align="center">
                  Partida Precisa
                </TableCell>
                <TableCell variant="head" align="center">
                  Destino
                </TableCell>
                <TableCell variant="head" align="center">
                  Asientos Disponibles
                </TableCell>
                <TableCell variant="head" align="center">
                  Precio por asiento
                </TableCell>
                <TableCell variant="head" align="center">
                  Teléfono
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!sortedAndFilteredData.length ? (
                <div>No se encontraron resultados</div>
              ) : (
                sortedAndFilteredData
                  .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                  .map((row) => {
                    const splittedDate = row.fecha?.split("-");
                    const formattedDate = `${splittedDate?.[2]}-${splittedDate?.[1]}-${splittedDate?.[0]}`;
                    return (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                          {row.horarioSalida} hs
                        </TableCell>
                        <TableCell
                          variant="footer"
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.saliendoDesde}
                        </TableCell>
                        <TableCell
                          variant="footer"
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.partidaExacta}
                        </TableCell>
                        <TableCell
                          variant="footer"
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.destino}
                        </TableCell>

                        <TableCell
                          variant="footer"
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.cantidadAsientos}
                        </TableCell>
                        <TableCell
                          variant="footer"
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {currencyFormat(+row.precioAsiento)}
                        </TableCell>
                        <TableCell
                          variant="footer"
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <CustomLink
                            target="_blank"
                            href={`${WHATSAPP_LINK}${row.telefonoContacto}`}
                          >
                            +54 9 {row.telefonoContacto}
                          </CustomLink>
                          {row.comentarios && (
                            <CustomizedToolTip title={row.comentarios} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </CustomTableContainer>
      )}
    </CustomBox>
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

const CustomBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
  marginBottom: "50px",
  [theme.breakpoints.down("md")]: {
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
  },
}));
