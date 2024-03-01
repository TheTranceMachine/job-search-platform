import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MainSidebar from './MainSidebar';
import ToDoList from '../ToDoList/ToDoList';

const MainStyle = {
  height: 'calc(100vh - 4.5rem)',
};

const Main = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex bg-white rounded-br-lg" style={MainStyle}>
        <Outlet />
        <MainSidebar>
          <ToDoList />
        </MainSidebar>
      </div>
    </div>
  );
};

export default Main;
