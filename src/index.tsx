import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { theme } from './theme/theme';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root is not found');

createRoot(rootEl).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
