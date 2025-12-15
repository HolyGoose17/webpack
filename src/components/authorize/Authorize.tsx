import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export const Authorize = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight={600}>
          Authorize
        </Typography>

        <Stack spacing={2}>
          <TextField label="Login" type="text" variant="outlined" fullWidth />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Stack>

        <Button variant="contained" size="large" fullWidth>
          Sign in
        </Button>

        <Typography variant="body2" textAlign="center">
          Don't have an account?{" "}
          <Link to="/registration">Let's registration</Link>
        </Typography>
      </Paper>
    </Box>
  );
};
