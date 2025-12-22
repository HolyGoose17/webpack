import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Layout';
import { LazyForwardPage } from '../pages/Forward/ForwardPage.lazy';
import { LazyProductsList } from '../pages/Products/ProductsList.lazy';
import { LazyAuthorize } from '../pages/Auth/Authorize.lazy';
import { LazyRegistration } from '../pages/Registration/Registration.lazy';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LazyForwardPage />,
      },
      {
        path: 'products',
        element: <LazyProductsList />,
      },
      {
        path: 'authorize',
        element: <LazyAuthorize />,
      },
      {
        path: 'registration',
        element: <LazyRegistration />,
      },
    ],
  },
]);
