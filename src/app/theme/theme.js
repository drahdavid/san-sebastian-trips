import { Rubik } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Rubik({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
