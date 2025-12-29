import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/routes';
import { store } from './store/store';
import { theme } from './theme/theme';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};
