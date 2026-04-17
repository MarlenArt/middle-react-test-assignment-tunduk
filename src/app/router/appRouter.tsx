import { createBrowserRouter } from 'react-router-dom';
import { CandidatesList } from '@/pages/CandidatesList';
import { CandidateDetail } from '@/pages/CandidateDetail';
import { BaseLayout } from '../layouts/baseLayout';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <div>error</div>,
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <CandidatesList />,
      },
      {
        path: '/product/:id',
        element: <CandidateDetail />,
      },
    ],
  },
]);
