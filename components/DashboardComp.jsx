'use client'
import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/operations/taskAPI'; // Import the function to fetch dashboard stats
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '@/services/formateDate';


export default function DashboardComp( ) {
  const [taskPriorityData, setTaskPriorityData] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [pendingTaskSummary, setPendingTaskSummary] = useState({});

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
// console.log("token in dasboard", token)
  useEffect(() => {

    // Use an async function inside useEffect
    const fetchDashboardStats = async () => {
      try {
        const response = await getDashboardStats(token); // Fetch the data asynchronously
        // console.log("stats data final",response); // Log the response

        if (response) {
          // Map the backend response to the state variables
          setSummaryData({
            totalTasks: response.totalTasks,
            tasksCompleted: response.completedPercentage?.toFixed(2),
            tasksPending: response.pendingPercentage?.toFixed(2),
            avgTimePerTask: response.averageCompletionTime?.toFixed(2)
            
          });

          setPendingTaskSummary({
            pendingTasks: response?.totalPendingTasks,
            totalTimeLapsed: response?.totalTimeLapsed,
            totalTimeToFinish: response?.totalTimeToFinish,
          });

          setTaskPriorityData(response.pendingSummary); // Set task priority data
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    // fetchDashboardStats(); // Call the async function
    if (token) {
      fetchDashboardStats(); // Call the async function if token is available
    }

  }, []); // Empty dependency array ensures this runs only once when the component mounts


    return (
        <div className="  p-8 h-full">

<h2 className="text-xl font-bold mb-4"> summary</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-lg font-semibold text-[#788895]">Total tasks</p>
    <p className="text-3xl font-bold text-[#6557f7]">{summaryData.totalTasks}</p>
  </div>

  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-lg font-semibold text-[#788895]">Tasks completed</p>
    <p className="text-3xl font-bold text-[#6557f7]">{summaryData.tasksCompleted}%</p>
  </div>

  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-lg font-semibold text-[#788895]">Tasks pending</p>
    <p className="text-3xl font-bold text-[#6557f7]">{summaryData.tasksPending}%</p>
  </div>

  <div className="bg-white p-4 rounded-lg shadow">
    <p className="text-lg font-semibold text-[#788895]">Average time per completed task</p>
    <p className="text-3xl font-bold text-[#6557f7]">{summaryData.avgTimePerTask} hrs</p>
  </div>
</div>

<div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Pending task summary</h2>

  <div className="grid md:grid-cols-3 gap-4">
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-lg font-semibold text-[#788895]">Pending tasks</p>
      <p className="text-3xl font-bold text-[#6557f7]">{pendingTaskSummary.pendingTasks}</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-lg font-semibold text-[#788895]">Total time lapsed</p>
      <p className="text-3xl font-bold text-[#6557f7]">{pendingTaskSummary.totalTimeLapsed} hrs</p>
    </div>

    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-lg font-semibold text-[#788895]">Total time to finish (estimated)</p>
      <p className="text-3xl font-bold text-[#6557f7]">{pendingTaskSummary.totalTimeToFinish} hrs</p>
    </div>
  </div>
</div>

<div className="mt-8">
  <h2 className="text-xl font-bold mb-4">Task priority</h2>

  <table className="min-w-full table-auto">
    <thead>
      <tr className="text-center text-white bg-[#788895]">
        <th className="px-4 py-2">Priority</th>
        <th className="px-4 py-2">Pending tasks</th>
        <th className="px-4 py-2">Time lapsed (hrs)</th>
        <th className="px-4 py-2">Time to finish (hrs)</th>
      </tr>
    </thead>
    <tbody>
      {taskPriorityData.map((row) => (
        <tr key={row.priority}
        className="text-center"
        >
          <td className="border px-4 py-2">{row.priority}</td>
          <td className="border px-4 py-2">{row.pendingTasks}</td>
          <td className="border px-4 py-2">{row.timeLapsed}</td>
          <td className="border px-4 py-2">{row.timeToFinish}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
    )


}