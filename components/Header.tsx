
import React from 'react';
import { User } from '../types';
import UserIcon from './icons/UserIcon';
import TaskIcon from './icons/TaskIcon';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <TaskIcon className="h-8 w-8 text-blue-500" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
          AI Employee Monitor
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
            <UserIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">{currentUser.name} ({currentUser.role})</span>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
