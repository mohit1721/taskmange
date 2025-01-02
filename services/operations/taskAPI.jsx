import { toast } from "react-hot-toast"
import { useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';

import { apiConnector } from "../apiconnector"
import { taskENDPOINTS } from "../apis"
const {
    CREATE_TASK_API,
    EDIT_TASK_API,
    DELETE_TASK_API,
    GET_DASHBOARD_STATS_API ,
    GET_TASKSLISTS_API,

}= taskENDPOINTS


// Backend Route (e.g., in `taskController.js`)
export const getDashboardStats = async (token) => {
  // const token = localStorage.getItem('token'); // Get the token from localStorage
  // const token = useSelector((state) => state.auth.token); // Get token from Redux
console.log("token in api call dasb", token)
  let result = "";

  try {
    const response = await apiConnector("GET", GET_DASHBOARD_STATS_API, {
      headers: {
        'Authorization': `Bearer ${token}`, // Send token as Bearer in Authorization header
      },
      withCredentials: true,
    });

    if (!response?.data) {
      throw new Error("Could Not Fetch Dashboard Stats");
    }

    result = response?.data;
    console.log("Dashboard Stats Data:", result);
  } catch (error) {
    console.error("GET_DASHBOARD_STATS_API ERROR:", error);
    // Optionally handle error UI feedback (e.g., toast notification)
    // toast.error("Failed to fetch dashboard stats");
  }

  return result;
};

export const getTaskLists = async(token,{ priority, status, sortBy,order,limit, page })=>{

  let result="";
console.log("token in getTaskLists fxn [api calling]", token)
  try {
    const params = {sortBy, order,priority, status, page ,limit};

     // Build query string from params
     const queryString = new URLSearchParams(params).toString();
     const apiUrl = `${GET_TASKSLISTS_API}?${queryString}`;

    const response = await apiConnector("GET", apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`, // Send token as Bearer in Authorization header
      },
      credentials: 'include', // Optional: include cookies if needed
    });

    if (!response?.data) {
      throw new Error("Could Not Fetch Dashboard Stats");
    }

    result = response?.data;
    console.log("Task lists Stats Data:", result);
  } catch (error) {
    console.error("GET_TASKLISTS_STATS_API ERROR:", error);
    // Optionally handle error UI feedback (e.g., toast notification)
    // toast.error("Failed to fetch dashboard stats");
  }

  return result;

}

export const createTask = async (taskData ,setTasks) => {

  
  // console.log('Token in API Call (Create Task):', token);
  console.log('Task Data:', taskData);

  let result = null;
    // const router = useRouter();

  try {
    // Optimistically add the task to the list
    setTasks(prevTasks => [...prevTasks, taskData]);

    const response = await apiConnector('POST', CREATE_TASK_API, taskData  );
//     console.log('Token in API Call [token fe se be ja rh h???]:', token); // Ensure token is defined

    if (!response?.data?.success) {
      throw new Error('Could not create task');
    }

   result = response?.data?.data;
    // toast.success("Task created successfully")
    // console.log('Task Created Successfully:', result);
    return result;
  } catch (error) {
    console.error('CREATE_TASK_API ERROR:', error);
    // Optionally handle error UI feedback (e.g., toast notification)
    toast.error('Failed to create task');
  }
  

  // return result;
};

export const editTask = async (taskId, taskData,setTasks) => {
  // console.log('Token in API Call (Edit Task):', token);
  console.log('Task Data:', taskData);

  let result = null;
const toastId = toast.loading("Loading...")
  try {
        // Optimistically update the task in the list
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, ...taskData } : task
          )
        );
    
    const response = await apiConnector('PUT', `${EDIT_TASK_API}/${taskId}`, taskData);
    // console.log('Token in API Call [Edit task, token fe se be ja rh h???]:', token); // Ensure token is defined

    if (!response?.data?.success) {
      throw new Error('Could not edit task');
    }

    result = response?.data?.data;
    // toast.success("Task edited successfully");
    // console.log('Task Edited Successfully:', result);
    return result;
  } catch (error) {
    console.error('EDIT_TASK_API ERROR:', error);
    // Optionally handle error UI feedback (e.g., toast notification)
    toast.error('Failed to edit task');
     // Rollback if failed (revert task data to its original state)
     setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...taskData } : task
      )
    );
  }finally{
    toast.dismiss(toastId)
  }

  // return result;
};

export const deleteTask = async (taskId) => {
  // console.log('Token in API Call (Delete Task):', token);

  let result = null;

  try {
    const response = await apiConnector('DELETE', `${DELETE_TASK_API}/${taskId}`);
    // console.log('Token in API Call [Delete task, token fe se be ja rh h???]:', token); // Ensure token is defined

    if (!response?.deletedTask) {
      throw new Error('Could not delete task');
    }

    result = response?.deletedTask;
    toast.success("Task deleted successfully");
    console.log('Task Deleted Successfully:', result);
    return result;
  } catch (error) {
    console.error('DELETE_TASK_API ERROR:', error);
    // Optionally handle error UI feedback (e.g., toast notification)
    toast.error('Failed to delete task');
  }

  // return result;
};
