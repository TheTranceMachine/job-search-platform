import { Link } from 'react-router-dom';
import { Outlet, RouterProvider } from 'react-router-dom';
import AppRoutes from './AppRoutes'
import JobBoard from './components/JobBoard/JobBoard';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  return (
    <>
      <header>Header</header>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/job-board">Job Board</Link>
            </li>
            <li>
              <Link to="/registration">Registration Form</Link>
            </li>
            <li>
              <Link to="/login">Login Form</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <aside>
          <ToDoList />
        </aside>
      </div>
      <footer>Footer</footer>
    </>
  )
}

export default App
