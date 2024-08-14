import React, { useEffect, useState } from 'react';
import {
  ListBulletIcon,
  DrawingPinFilledIcon,
  HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');

    sidebar.classList.add('transition-all');
    sidebar.classList.add('duration-500');
    sidebar.classList.add('ease-in-out');
    sidebar.classList.add('delay-100');
    if (toggle) {
      sidebar.classList.add('w-60');
      sidebar.classList.remove('w-16');
    } else {
      sidebar.classList.add('w-16');
      sidebar.classList.remove('w-60');
    }
  }, [toggle]);
  return (
    <nav className="flex-none w-60 rounded-l-lg sidebar">
      <div
        className={`h-14 flex flex-row ${toggle ? 'justify-between px-3' : 'justify-center'} items-center`}
      >
        {toggle && (
          <span className="self-center text-white text-3xl great-vibes-regular-font sidebar-logo">
            FindWork
          </span>
        )}
        <div
          className="text-white cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          <HamburgerMenuIcon />
        </div>
      </div>
      <ul className="flex flex-col text-white border-t border-gray-700">
        <li className="hover:bg-slate-900 py-2 px-3 text-sm">
          <Link
            to="/job-board"
            className={`flex ${toggle ? '' : 'justify-center'} items-center gap-2`}
          >
            <ListBulletIcon />
            {toggle && 'Job Board'}
          </Link>
        </li>
        <li className="hover:bg-slate-900 py-2 px-3 border-t border-b border-gray-700 text-sm">
          <Link
            to="/jobs"
            className={`flex ${toggle ? '' : 'justify-center'} items-center gap-2`}
          >
            <DrawingPinFilledIcon />
            {toggle && 'Saved Jobs'}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
