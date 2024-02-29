import "./global.css";

import { GoogleAnalytics } from "@next/third-parties/google";

import { ThemeRegistry } from "./components/ThemeRegistry";

import { NavBar } from "./components/NavBar";

export const metadata = {
  title: "San Sebastián Trips",
  description:
    "Aplicación utilizada para compartir un asiento durante viajes realizados en Barrio San Sebastián y alrededores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <NavBar />
          {children}
        </body>
      </ThemeRegistry>

      <GoogleAnalytics gaId="G-HFLY03QFLR" />
    </html>
  );
}
