
import React from 'react';
import { Task, Priority, TaskStatus, UserRole } from '../types';
import ClockIcon from './icons/ClockIcon';

interface TaskItemProps {
  task: Task;
  userRole: UserRole;
  onCompleteTask?: (taskId: string) => void;
}

const priorityColors: { [key in Priority]: string } = {
  [Priority.High]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [Priority.Medium]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [Priority.Low]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const statusColors = {
  [TaskStatus.Completed]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [TaskStatus.Pending]: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
  Delayed: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, userRole, onCompleteTask }) => {
  const isDelayed = task.status === TaskStatus.Pending && new Date(task.deadline) < new Date();
  const displayStatus = isDelayed ? 'Delayed' : task.status;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 flex flex-col justify-between transition-shadow hover:shadow-lg">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{task.title}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{task.explanation}</p>
        <div className="flex items-center mt-4 text-sm text-slate-500 dark:text-slate-400">
          <ClockIcon className="h-4 w-4 mr-2" />
          <span>Deadline: {formatDate(task.deadline)}</span>
        </div>
        {task.completedAt && (
             <div className="flex items-center mt-2 text-sm text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Completed: {formatDate(task.completedAt)}</span>
            </div>
        )}
      </div>
      <div className="flex justify-between items-end mt-4">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[displayStatus]}`}>
          {displayStatus}
        </span>
        {userRole === UserRole.Employee && task.status === TaskStatus.Pending && onCompleteTask && (
          <button
            onClick={() => onCompleteTask(task.id)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
