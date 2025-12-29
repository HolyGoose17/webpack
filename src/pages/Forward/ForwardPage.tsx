import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ForwardCard = () => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '80%',
        },
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Find products"
        variant="outlined"
        sx={{ borderRadius: '60px' }}
      />
    </Box>
  );
};

export default ForwardCard;
