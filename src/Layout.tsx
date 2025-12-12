import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./App.css";
import { green, purple } from "@mui/material/colors";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";

export const theme = createTheme({
  palette: {
    primary: green,
    secondary: purple,
  },
});

export const Layout = () => {
  return (
    <AppBar position="sticky">
      <Container
        fixed
        style={{
          width: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <StoreIcon />
            </Link>
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Box mr={{ display: "flex", gap: 18 }}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => console.log("Авторизация")}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/authorize"
              >
                Log In
              </Link>
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => console.log("Регистрация")}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/registration"
              >
                Sign Up
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
