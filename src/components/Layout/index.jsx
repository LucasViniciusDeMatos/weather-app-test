import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", height: "100%" }}>
      <AppBar sx={{ position: "static" }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: 900,
              width: "100%",
              mx: "auto",
              p: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontSize: 24, flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Weather Case Test
            </Typography>
            <Button color="inherit" onClick={() => navigate("/favorite")}>
              Favorites
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 900, width: "100%", mx: "auto", p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
