import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';

import '@/styles/global.scss';
import { Provider } from 'react-redux';
import { store } from '../../store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
