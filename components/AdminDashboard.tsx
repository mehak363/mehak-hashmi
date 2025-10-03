
import React from 'react';
import { User, Task, Session, UserRole } from '../types';
import TaskAssignmentForm from './TaskAssignmentForm';
import EmployeePerformanceReport from './EmployeePerformanceReport';

interface AdminDashboardProps {
  users: User[];
  tasks: Task[];
  sessions: Session[];
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, tasks, sessions, onAddTask }) => {
  const employees = users.filter(user => user.role === UserRole.Employee);
  
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Admin Dashboard
      </h2>
      <TaskAssignmentForm employees={employees} onAddTask={onAddTask} />
      <EmployeePerformanceReport employees={employees} tasks={tasks} sessions={sessions} />
    </div>
  );
};

export default AdminDashboard;
