
import { User, Task, UserRole, Priority, TaskStatus } from './types';

export const USERS: User[] = [
  { id: 1, name: 'Admin User', role: UserRole.Admin },
  { id: 2, name: 'Alice Johnson', role: UserRole.Employee },
  { id: 3, name: 'Bob Williams', role: UserRole.Employee },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Develop Q3 Report',
    explanation: 'Compile sales data and create a comprehensive report for the third quarter.',
    priority: Priority.High,
    deadline: tomorrow.toISOString(),
    assignedTo: 2,
    status: TaskStatus.Pending,
  },
  {
    id: 'task-2',
    title: 'Update Client Database',
    explanation: 'Review and update contact information for all key clients.',
    priority: Priority.Medium,
    deadline: tomorrow.toISOString(),
    assignedTo: 2,
    status: TaskStatus.Pending,
  },
  {
    id: 'task-3',
    title: 'Fix Login Page Bug',
    explanation: 'A critical bug has been reported on the login page that needs immediate attention.',
    priority: Priority.High,
    deadline: yesterday.toISOString(),
    assignedTo: 3,
    status: TaskStatus.Pending,
  },
  {
    id: 'task-4',
    title: 'Onboard New Intern',
    explanation: 'Prepare onboarding materials and schedule introduction meetings for the new intern.',
    priority: Priority.Low,
    deadline: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    assignedTo: 3,
    status: TaskStatus.Completed,
    completedAt: yesterday.toISOString(),
  },
];
