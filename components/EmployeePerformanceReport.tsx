
import React, { useState, useCallback } from 'react';
import { User, Task, Session, UserRole } from '../types';
import { generatePerformanceReport } from '../services/geminiService';
import Modal from './Modal';
import Spinner from './Spinner';

interface EmployeePerformanceReportProps {
  employees: User[];
  tasks: Task[];
  sessions: Session[];
}

const EmployeePerformanceReport: React.FC<EmployeePerformanceReportProps> = ({ employees, tasks, sessions }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(employees[0]?.id.toString() || '');
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGenerateReport = useCallback(async () => {
    if (!selectedEmployeeId) {
      alert('Please select an employee.');
      return;
    }
    setIsLoading(true);
    setReport('');
    const employee = employees.find(e => e.id === parseInt(selectedEmployeeId));
    if (employee) {
      const employeeTasks = tasks.filter(t => t.assignedTo === employee.id);
      const employeeSessions = sessions.filter(s => s.userId === employee.id);
      const generatedReport = await generatePerformanceReport(employee, employeeTasks, employeeSessions);
      setReport(generatedReport);
      setIsModalOpen(true);
    }
    setIsLoading(false);
  }, [selectedEmployeeId, employees, tasks, sessions]);

  const selectedEmployeeName = employees.find(e => e.id === parseInt(selectedEmployeeId))?.name || 'Employee';

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">AI Performance Reports</h3>
      <div className="flex items-end space-x-4">
        <div className="flex-grow">
          <label htmlFor="employee-select-report" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Select Employee</label>
          <select
            id="employee-select-report"
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:bg-purple-400 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'Generate Report'}
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Performance Report for ${selectedEmployeeName}`}>
        {report ? (
          <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }} />
        ) : (
          <p>No report generated.</p>
        )}
      </Modal>
    </div>
  );
};

export default EmployeePerformanceReport;
