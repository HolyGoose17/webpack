import { Box, TextField } from "@mui/material";

export const ForwardPage = () => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "300px",
        display: "flex",
        justifyContent: "center",
        backgroundImage: "",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Find products"
          variant="outlined"
        />
      </Box>
    </div>
  );
};
