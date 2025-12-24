import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Suspense, useState } from 'react';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import StoreIcon from '@mui/icons-material/Store';
import { useAppSelector, useAppDispatch } from './hooks/redux.hook';
import { logout } from './store/auth';

const drawerWidth = 180;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Layout = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { isAuth, user } = useAppSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box>
      <AppBar position="fixed">
        <Container
          fixed
          sx={{
            maxWidth: '100% !important',
            width: '100%',
            px: 0,
            mx: 0,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    mr: 2,
                  },
                  open && { display: 'none' },
                ]}
              >
                <MenuIcon />
              </IconButton>
              <Link component={RouterLink} to="">
                <IconButton>
                  <StoreIcon />
                </IconButton>
              </Link>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            ></Box>
            {!isAuth && !user ? (
              <Box mr={{ display: 'flex', gap: 18 }}>
                <Link component={RouterLink} to="authorize">
                  <Button color="inherit" variant="outlined">
                    Log In
                  </Button>
                </Link>
                <Link component={RouterLink} to="registration">
                  <Button color="secondary" variant="contained">
                    Sign Up
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1">Hello: {user?.username}</Typography>
                <Button color="secondary" variant="contained" onClick={handleLogout}>
                  Sign Out
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Link component={RouterLink} to="products" onClick={handleDrawerClose}>
          <ListItemButton>
            <ListItemText>Products</ListItemText>
          </ListItemButton>
        </Link>
        <Divider />
      </Drawer>
      <Main open={open} sx={{ mx: 0, px: 0 }}>
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          {' '}
          <Outlet />
        </Suspense>
      </Main>
    </Box>
  );
};
