
import { GoogleGenAI } from "@google/genai";
import { User, Task, Session, TaskStatus } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatDateTime(isoString?: string): string {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString();
}

function calculateDuration(start: string, end?: string): string {
    const startTime = new Date(start).getTime();
    const endTime = end ? new Date(end).getTime() : new Date().getTime();
    const diff = Math.abs(endTime - startTime);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
}

export const generatePerformanceReport = async (
    employee: User,
    tasks: Task[],
    sessions: Session[]
): Promise<string> => {
    const today = new Date().toISOString().split('T')[0];

    const todaySessions = sessions
        .filter(s => new Date(s.loginTime).toISOString().startsWith(today))
        .map(s => `  - Login: ${formatDateTime(s.loginTime)}, Logout: ${s.logoutTime ? formatDateTime(s.logoutTime) : 'Active'}, Duration: ${calculateDuration(s.loginTime, s.logoutTime)}`)
        .join('\n');
    
    const totalTimeWorked = sessions
        .filter(s => new Date(s.loginTime).toISOString().startsWith(today))
        .reduce((total, s) => {
            const startTime = new Date(s.loginTime).getTime();
            const endTime = s.logoutTime ? new Date(s.logoutTime).getTime() : new Date().getTime();
            return total + (endTime - startTime);
        }, 0);

    const tasksInfo = tasks.map(t => {
        const isDelayed = t.status === TaskStatus.Pending && new Date(t.deadline) < new Date();
        const status = isDelayed ? 'Delayed' : t.status;
        let line = `  - Task: "${t.title}", Priority: ${t.priority}, Deadline: ${formatDateTime(t.deadline)}, Status: ${status}`;
        if (t.status === TaskStatus.Completed) {
            line += `, Completed on: ${formatDateTime(t.completedAt)}`;
        }
        return line;
    }).join('\n');

    const prompt = `
You are an expert HR analyst AI. Your task is to generate a performance report for an employee based on the provided data. The report should be clear, concise, professional, and written in markdown format.

**Employee Data:**
- Name: ${employee.name}
- Date: ${new Date().toLocaleDateString()}

**Login/Logout Sessions for Today:**
${todaySessions.length > 0 ? todaySessions : "  - No login sessions recorded today."}

**Assigned Tasks Summary:**
${tasksInfo.length > 0 ? tasksInfo : "  - No tasks assigned."}

**Analysis Request:**
Based on the data above, please generate a performance report with the following sections in markdown:
1.  **Attendance Summary:** Briefly summarize the employee's login/logout activity for the day. The total time worked today is ${calculateDuration(`1970-01-01T00:00:00.000Z`, new Date(totalTimeWorked).toISOString())}.
2.  **Task Management:** Analyze the task completion status. Highlight on-time completions, pending tasks, and any delayed tasks.
3.  **Productivity Insights:** Provide 2-3 bullet points with smart, actionable insights into the employee's performance and productivity. Focus on patterns, efficiency, and areas for potential improvement or commendation. Use a professional and encouraging tone.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating performance report:", error);
        return "Error: Could not generate the performance report. Please check the API key and network connection.";
    }
};
