import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import JobBoard from './components/JobBoard/JobBoard';
import ToDoList from './components/ToDoList/ToDoList';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/job-board',
    element: <JobBoard />,
  },
  {
    path: '/todo',
    element: <ToDoList />,
  },
];

function AppRoutes() {
  return createBrowserRouter(routes);
}

export default AppRoutes;
