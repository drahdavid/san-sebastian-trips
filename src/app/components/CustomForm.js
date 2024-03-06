import React, { useState, useMemo, useEffect } from "react";

import { Captcha } from "./Captcha";

import { DEPARTURE_LOCATIONS } from "../utils/constants";
import { getDayName } from "../utils";

import {
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
  CircularProgress,
  styled,
} from "@mui/material";

import { MODE } from "../utils/constants";

import { CustomSelect } from "./CustomSelect";
import { Checkbox } from "./Checkbox";

export const CustomForm = ({ setSelectedMode }) => {
  const [isSendingData, setIsSendingData] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    fechaFinal: "",
    saliendoDesde: DEPARTURE_LOCATIONS[0],
    partidaExacta: "",
    destino: "",
    horarioSalida: "",
    cantidadAsientos: "",
    precioAsiento: "",
    telefonoContacto: "",
    comentarios: "",
    esRecurrente: false,
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const areFieldsDefined = useMemo(() => {
    const { comentarios, fechaFinal, ...mandatoryFields } = formData;

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

  const recurrencyDate = formData.esRecurrente
    ? `(Todos los ${getDayName(formData.fecha)})`
    : "";

  useEffect(() => {
    !formData.esRecurrente && setFormData({ ...formData, fechaFinal: "" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.esRecurrente]);

  return (
    <Container style={{ marginBottom: "200px" }}>
      <Typography variant="h6" style={{ margin: "20px 0" }}>
        Formulario de Viaje
      </Typography>

      <form onSubmit={handleSubmit}>
        <CustomGridForm>
          <TextField
            label={formData.esRecurrente ? "Desde" : "Fecha"}
            type="date"
            name="fecha"
            value={formData.fecha}
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

          <CustomSelect
            select
            label="Saliendo desde"
            name="saliendoDesde"
            value={formData.saliendoDesde}
            onChange={handleChange}
            fullWidth
            margin="normal"
            data={DEPARTURE_LOCATIONS}
          />

          <CustomCheckbox
            disabled={formData.fecha ? false : true}
            onChange={(e) =>
              setFormData({ ...formData, esRecurrente: e.target.checked })
            }
            label={`Es Recurrente ${recurrencyDate}`}
          />

          <TextField
            label="Es recurrente hasta"
            type="date"
            name="fechaFinal"
            disabled={!formData.esRecurrente}
            value={formData.fechaFinal}
            defaultValue={formData.fechaFinal}
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

export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  margin: "16px 0 8px 0",
  border: `solid 1px ${theme.palette.grey[400]}`,
  borderRadius: "4px",
  height: "55px",
}));
