import { Card, CardContent, Typography, Grid } from "@mui/material";

import { WHATSAPP_LINK } from "../utils/constants";
import { currencyFormat } from "../utils";

import React from "react";
import Link from "next/link";

export const CardMobile = ({ tripData }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "auto",
        mt: 5,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Detalles de Viaje
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(tripData).map(([key, value]) => {
            if (key === "id") return null;
            const formattedKey =
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1");
            return (
              <Grid item xs={12} key={key}>
                <Typography
                  fontSize={12}
                  variant="subtitle1"
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {formattedKey}:
                </Typography>
                {key === "telefonoContacto" ? (
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`${WHATSAPP_LINK}${value}`}
                    target="_blank"
                  >
                    <Typography
                      fontSize={12}
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1, cursor: "pointer", color: "black" }}
                    >
                      {`+54 9 ${value}` || "N/A"}
                    </Typography>
                  </Link>
                ) : (
                  <Typography
                    fontSize={12}
                    variant="body2"
                    color="text.secondary"
                    component="span"
                    sx={{ ml: 1 }}
                  >
                    {key === "precioAsiento"
                      ? currencyFormat(+value) || "N/A"
                      : value || "N/A"}
                  </Typography>
                )}
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
