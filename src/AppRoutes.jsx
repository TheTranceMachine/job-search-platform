import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const routes = [
  {
    path: "/",
    element: <App />
  }
];

function AppRoutes() {
  return createBrowserRouter(routes);
};

export default AppRoutes;
