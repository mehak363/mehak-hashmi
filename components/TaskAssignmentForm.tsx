
import React, { useState } from 'react';
import { User, Priority, Task, UserRole } from '../types';

interface TaskAssignmentFormProps {
  employees: User[];
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const TaskAssignmentForm: React.FC<TaskAssignmentFormProps> = ({ employees, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [deadline, setDeadline] = useState('');
  const [assignedTo, setAssignedTo] = useState<string>(employees[0]?.id.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !explanation || !deadline || !assignedTo) {
      alert('Please fill out all fields.');
      return;
    }
    onAddTask({
      title,
      explanation,
      priority,
      deadline,
      assignedTo: parseInt(assignedTo),
    });
    // Reset form
    setTitle('');
    setExplanation('');
    setPriority(Priority.Medium);
    setDeadline('');
    setAssignedTo(employees[0]?.id.toString() || '');
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Assign a New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Task Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="explanation" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Explanation</label>
          <textarea id="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
              <select id="priority" value={priority} onChange={e => setPriority(e.target.value as Priority)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Deadline</label>
              <input type="datetime-local" id="deadline" value={deadline} onChange={e => setDeadline(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Assign To</label>
              <select id="assignedTo" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
              </select>
            </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskAssignmentForm;
