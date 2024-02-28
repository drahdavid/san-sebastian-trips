import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../../../public/assets/san-sebas-logo.png";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => (
  <AppBar color={"success"} position="static">
    <Toolbar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            style={{ marginRight: 20, height: 180, width: 180 }}
          />
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
);
