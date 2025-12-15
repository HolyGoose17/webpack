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
import { green, purple } from "@mui/material/colors";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";

export const theme = createTheme({
  palette: {
    primary: green,
    secondary: purple,
  },
});

function App() {
  return (
    <AppBar position="fixed">
      <Container
        fixed
        sx={{
          width: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: 0,
          marginRight: 0,
        }}
      >
        <Toolbar>
          <Link to="/">
            <StoreIcon />
          </Link>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Box mr={{ display: "flex", gap: 18 }}>
            <Button color="inherit" variant="outlined">
              <Link to="/authorize">Log In</Link>
            </Button>
            <Button color="secondary" variant="contained">
              <Link to="/registration">Sign Up</Link>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default App;
