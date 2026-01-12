import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../Layout';

const LazyForwardPage = lazy(() => import('../pages/Forward/ForwardPage'));
const LazyProductsList = lazy(() => import('../pages/Products/ProductsList'));
const LazyProductDetails = lazy(() => import('../pages/Products/ProductDetails'));
const LazyAuthorize = lazy(() => import('../pages/Auth/Authorize'));
const LazyRegistration = lazy(() => import('../pages/Registration/Registration'));

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
        path: 'products/:id',
        element: <LazyProductDetails />,
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
