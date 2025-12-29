import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux.hook';
import { useLoginMutation } from '../../store/api';
import { setCredentials } from '../../store/auth';

const Authorize = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [auth, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const result = await auth({
        username: login,
        password,
      }).unwrap();

      navigate('/');

      dispatch(
        setCredentials({
          user: {
            id: result.id,
            username: result.username,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
          },
          token: result.token,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100dvw',
        maxHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight={600}>
          Authorize
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="User Name"
            type="text"
            variant="outlined"
            fullWidth
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Sign in
        </Button>

        <Typography variant="body2" textAlign="center">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/registration">
            Let's registration
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Authorize;
