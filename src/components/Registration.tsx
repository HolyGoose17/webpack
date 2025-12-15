import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const Registration = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
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
          Registration
        </Typography>

        <Stack spacing={2}>
          <TextField label="Login" type="text" variant="outlined" fullWidth />
          <TextField label="Email" type="email" variant="outlined" fullWidth />

          <TextField label="Phone" type="text" variant="outlined" fullWidth />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Repeat password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Stack>

        <Button variant="contained" size="large" fullWidth>
          Sign up
        </Button>
      </Paper>
    </Box>
  );
};
