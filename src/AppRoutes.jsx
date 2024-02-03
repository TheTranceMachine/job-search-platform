import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import JobBoard from './components/JobBoard/JobBoard';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/registration",
        element: <RegistrationForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/job-board",
        element: <JobBoard />,
      }
    ],
  }
];

function AppRoutes() {
  return createBrowserRouter(routes);
}

export default AppRoutes;
