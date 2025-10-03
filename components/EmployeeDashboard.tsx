
import React from 'react';
import { Task, User, TaskStatus } from '../types';
import TaskItem from './TaskItem';

interface EmployeeDashboardProps {
  currentUser: User;
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ currentUser, tasks, onCompleteTask }) => {
  const myTasks = tasks.filter(task => task.assignedTo === currentUser.id);
  const pendingTasks = myTasks.filter(task => task.status === TaskStatus.Pending).sort((a,b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  const completedTasks = myTasks.filter(task => task.status === TaskStatus.Completed).sort((a,b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Welcome, {currentUser.name}!
      </h2>

      <div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 border-b-2 border-blue-500 pb-2">
          Pending Tasks ({pendingTasks.length})
        </h3>
        {pendingTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} userRole={currentUser.role} onCompleteTask={onCompleteTask} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">You have no pending tasks. Great job!</p>
        )}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 border-b-2 border-slate-500 pb-2">
          Completed Tasks ({completedTasks.length})
        </h3>
        {completedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} userRole={currentUser.role} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">You have not completed any tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
