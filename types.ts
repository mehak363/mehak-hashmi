
export enum UserRole {
  Admin = 'Admin',
  Employee = 'Employee',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TaskStatus {
  Pending = 'Pending',
  Completed = 'Completed',
}

export interface Task {
  id: string;
  title: string;
  explanation: string;
  priority: Priority;
  deadline: string; // ISO string
  assignedTo: number; // User ID
  status: TaskStatus;
  completedAt?: string; // ISO string
}

export interface Session {
  id: string;
  userId: number;
  loginTime: string; // ISO string
  logoutTime?: string; // ISO string
}
