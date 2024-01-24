import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import JobBoard from './components/JobBoard/JobBoard';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/job-board',
    element: <JobBoard />,
  },
];

function AppRoutes() {
  return createBrowserRouter(routes);
}

export default AppRoutes;
