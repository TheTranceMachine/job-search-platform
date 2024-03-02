import { ListBulletIcon, DrawingPinFilledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="flex-none w-60 rounded-l-lg sidebar">
      <div className="h-14 flex justify-center">
        <span className="self-center text-white text-xl">Welcome Greg!</span>
      </div>
      <ul className="flex flex-col text-white border-t border-gray-700">
        <li className="hover:bg-slate-900 py-2 px-3 text-sm">
          <Link to="/job-board" className="flex items-center gap-2">
            <ListBulletIcon />
            Job Board
          </Link>
        </li>
        <li className="hover:bg-slate-900 py-2 px-3 border-t border-b border-gray-700 text-sm">
          <Link to="/jobs" className="flex items-center gap-2">
            <DrawingPinFilledIcon />
            Saved Jobs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
