"use client";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const tripData = {
  date: "2024-02-29",
  leavingFrom: "New York",
  exactDeparture: "JFK International Airport",
  to: "Los Angeles",
  departureTime: "10:00 AM",
  seatQuantity: "2",
  seatPrice: "$199",
  contactPhone: "+1234567890",
  comment: "Please be at the airport 2 hours early.",
};

export default function TestPage() {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Detalles de Viaje
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(tripData).map(([key, value]) => (
            <Grid item xs={12} key={key}>
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
                :
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="span"
                sx={{ ml: 1 }}
              >
                {value || "N/A"}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
