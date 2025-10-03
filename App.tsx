
import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { User, UserRole, Task, Session, TaskStatus } from './types';
import { USERS, INITIAL_TASKS } from './constants';
import Login from './components/Login';
import Header from './components/Header';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.Employee) {
      const newSession: Session = {
        id: `session-${Date.now()}`,
        userId: user.id,
        loginTime: new Date().toISOString(),
      };
      setSessions(prevSessions => [...prevSessions, newSession]);
    }
  }, []);

  const handleLogout = useCallback(() => {
    if (currentUser && currentUser.role === UserRole.Employee) {
      setSessions(prevSessions => {
        // Fix: Replaced findLastIndex with a reverse loop for broader compatibility.
        let lastSessionIndex = -1;
        for (let i = prevSessions.length - 1; i >= 0; i--) {
          if (prevSessions[i].userId === currentUser.id && !prevSessions[i].logoutTime) {
            lastSessionIndex = i;
            break;
          }
        }

        if (lastSessionIndex > -1) {
          const updatedSessions = [...prevSessions];
          updatedSessions[lastSessionIndex] = {
            ...updatedSessions[lastSessionIndex],
            logoutTime: new Date().toISOString(),
          };
          return updatedSessions;
        }
        return prevSessions;
      });
    }
    setCurrentUser(null);
  }, [currentUser]);

  const handleAddTask = useCallback((newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      status: TaskStatus.Pending,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const handleCompleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: TaskStatus.Completed, completedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  useEffect(() => {
    // Add event listener to handle logout on tab close for employees
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (currentUser && currentUser.role === UserRole.Employee) {
        // This is a synchronous operation, so we directly update a 'ref' or do a best-effort sync call.
        // For this prototype, we'll just log out. In a real app, you might use navigator.sendBeacon.
        handleLogout();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentUser, handleLogout]);

  if (!currentUser) {
    return <Login users={USERS} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main>
        {currentUser.role === UserRole.Admin ? (
          <AdminDashboard
            users={USERS}
            tasks={tasks}
            sessions={sessions}
            onAddTask={handleAddTask}
          />
        ) : (
          <EmployeeDashboard
            currentUser={currentUser}
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
          />
        )}
      </main>
    </div>
  );
};

export default App;
