import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Orders } from '@/pages/Orders';
import { Customers } from '@/pages/Customers';
import { Feedback } from '@/pages/Feedback';
import { Settings } from '@/pages/Settings';
import { Login } from '@/pages/Login';

import { Navigate, useRoutes } from 'react-router-dom';
import { Registration } from './pages/Registration';
import { RoutesPropsTypes } from './types/Routes.types';

export function Routes({ isAuthorization }: RoutesPropsTypes) {
  if (isAuthorization === undefined) return;
  const route = useRoutes([
    {
      path: '/',
      element: isAuthorization ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: '/products',
      element: isAuthorization ? <Products /> : <Navigate to="/login" />,
    },
    {
      path: '/orders',
      element: isAuthorization ? <Orders /> : <Navigate to="/login" />,
    },
    {
      path: '/customers',
      element: isAuthorization ? <Customers /> : <Navigate to="/login" />,
    },
    {
      path: '/feedback',
      element: isAuthorization ? <Feedback /> : <Navigate to="/login" />,
    },
    {
      path: '/settings',
      element: isAuthorization ? <Settings /> : <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/registration',
      element: <Registration />,
    },
  ]);

  return route;
}
