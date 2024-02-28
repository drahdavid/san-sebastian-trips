import React, { useState, useMemo } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

import { DEPARTURE_LOCATIONS } from "../utils/constants";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  InputAdornment,
  CircularProgress,
  styled,
} from "@mui/material";

import { MODE } from "../utils/constants";

export const CustomForm = ({ setSelectedMode }) => {
  const [isSendingData, setIsSendingData] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    leavingFrom: DEPARTURE_LOCATIONS[0],
    exactDeparture: "",
    to: "",
    departureTime: "",
    seatQuantity: "",
    seatPrice: "",
    contactPhone: "",
    comment: "",
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const areFieldsDefined = useMemo(() => {
    const { comment, ...mandatoryFields } = formData;
    return Object.values(mandatoryFields).every((value) => value !== "");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setIsSendingData(true);

    event.preventDefault();

    await addDoc(collection(db, "REGISTROS"), formData);

    setSelectedMode(MODE.SEARCH);

    setIsSendingData(false);
  };

  return (
    <Container style={{ marginBottom: "200px" }}>
      <Typography variant="h6" style={{ margin: "20px 0" }}>
        Formulario de Viaje
      </Typography>

      <form onSubmit={handleSubmit}>
        <CustomGridForm>
          <TextField
            label="Fecha"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: todayDate,
              shrink: false,
            }}
          />
          <TextField
            select
            label="Saliendo desde"
            name="leavingFrom"
            value={formData.leavingFrom}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {DEPARTURE_LOCATIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Locación de partida exacta"
            name="exactDeparture"
            value={formData.exactDeparture}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Destino"
            name="to"
            value={formData.to}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Horario de salida"
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Cantidad de Asientos"
            type="number"
            name="seatQuantity"
            value={formData.seatQuantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio por Asiento"
            type="number"
            name="seatPrice"
            value={formData.seatPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Teléfono de contacto"
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comentarios adicionales (opcional)"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="info"
            style={{ marginTop: "50px", height: "50px" }}
            disabled={!areFieldsDefined || isSendingData}
          >
            {isSendingData ? (
              <CircularProgress thickness={2} size={30} />
            ) : (
              "Enviar"
            )}
          </Button>
        </CustomGridForm>
      </form>
    </Container>
  );
};

const CustomGridForm = styled("div")(({ theme }) => ({
  display: "grid",
  width: "100%",
  gap: 20,
  gridTemplateColumns: "1fr 1fr",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));
