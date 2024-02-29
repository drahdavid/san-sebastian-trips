import React, { useState, useMemo } from "react";

import { Captcha } from "./Captcha";

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
  const [captcha, setCaptcha] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    saliendoDesde: DEPARTURE_LOCATIONS[0],
    partidaExacta: "",
    destino: "",
    horarioSalida: "",
    cantidadAsientos: "",
    precioAsiento: "",
    telefonoContacto: "",
    comentarios: "",
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const areFieldsDefined = useMemo(() => {
    const { comentarios, ...mandatoryFields } = formData;
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

    await fetch("/api/create-trip", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });

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
            name="fecha"
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
            name="saliendoDesde"
            value={formData.saliendoDesde}
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
            name="partidaExacta"
            value={formData.partidaExacta}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Destino"
            name="destino"
            value={formData.destino}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Horario de salida"
            type="time"
            name="horarioSalida"
            value={formData.horarioSalida}
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
            name="cantidadAsientos"
            value={formData.cantidadAsientos}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio por Asiento"
            type="number"
            name="precioAsiento"
            value={formData.precioAsiento}
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
            name="telefonoContacto"
            value={formData.telefonoContacto}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comentarios adicionales (opcional)"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          <Captcha setCaptcha={setCaptcha} />

          <Button
            type="submit"
            variant="contained"
            color="info"
            style={{ marginTop: "50px", height: "50px" }}
            disabled={
              !areFieldsDefined ||
              isSendingData ||
              !captcha ||
              captcha?.length < 20
            }
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
