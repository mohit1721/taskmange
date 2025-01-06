import React, { useState, useEffect } from 'react';
import './TaskModal.css'; // Import your CSS for styling ()
import { createTask, editTask } from '@/services/operations/taskAPI';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie'; // Using js-cookie to get cookies
import {toast} from 'react-hot-toast'
import dayjs from 'dayjs'; // Install it if not already: npm install dayjs


function TaskModal({  isOpen, onClose, isEditMode,taskId, taskData, onSubmit }) {
  const [title, setTitle] = useState(isEditMode ? taskData.title : '');
  const [priority, setPriority] = useState(isEditMode ? taskData.priority : 1);
  const [status, setStatus] = useState(isEditMode ? taskData.status : 'pending');
  const [startTime, setStartTime] = useState(isEditMode ? taskData.startTime : '');
  const [endTime, setEndTime] = useState(isEditMode ? taskData.endTime : '');
    const router = useRouter();
    const [tasks, setTasks] = useState([]);

  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  // const token = Cookies.get('__clerk_db_jwt') || Cookies.get('next-auth.session-token');
  console.log('Token in API Call [inside modal] (Create Task):', token);

console.log("token in modal", token)

  // useEffect(() => {
  //   if (isEditMode && taskData) {
  //     setTitle(taskData.title);
  //     setPriority(taskData.priority);
  //     setStatus(taskData.status);
  //     setStartTime(taskData.startTime);
  //     setEndTime(taskData.endTime);
  //   }
  // }, [isEditMode, taskData]);

  useEffect(() => {
    if (isEditMode && taskData) {
      setTitle(taskData.title || '');
      setPriority(taskData.priority || '');
      setStatus(taskData.status || '');
      setStartTime(taskData.startTime ? dayjs(taskData.startTime).format('YYYY-MM-DDTHH:mm') : '');
      setEndTime(taskData.endTime ? dayjs(taskData.endTime).format('YYYY-MM-DDTHH:mm') : '');
    }
  }, [isEditMode, taskData]);

  

  const handleClose = () => {
    setTimeout(() => {
      onClose();  // Call the onClose function passed from parent
    }, 100);  // Delay added to ensure that the state reset happens before modal closes
  
    setTitle('');
    setPriority(1);
    setStatus('');
    setStartTime('');
    setEndTime('');
    // onClose();
    // Close the modal after a slight delay to allow the state reset to take effect
  
  };
  useEffect(() => {
    console.log('Modal isOpen:', isOpen);
  }, [isOpen]);
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // ✅ Prevent default form submission behavior
  
  //   if (!title.trim()) {
  //     alert('Title is required.');
  //     return;
  //   }
  
  //   const taskData = {
  //     title,
  //     priority,
  //     status,
  //     startTime,
  //     endTime,
  //   };
  
  //   const toastId = toast.loading(isEditMode ? "Updating Task..." : "Creating Task...");
  // console.log("taskId in modal",taskId)
  //   try {
  //     let response;
  //     if (isEditMode) {
  //       // Edit Task API Call
  //       response = await editTask(taskId, taskData); 
  //     } else {
  //       // Create Task API Call
  //       response = await createTask(taskData); 
  //     }
  
  //     console.log(`${isEditMode ? "Updated" : "Created"} Task from BE [after FE call]:`, response);
  
  //     if (response?.success) {
  //       onSubmit(taskData); // ✅ Update parent component with task data
  //       handleClose();
  //       router.push('/tasklist'); // ✅ Redirect to tasklist page
  //       toast.success(`Task ${isEditMode ? "updated" : "created"} successfully`);
  //     } else {
  //       console.error(`Error ${isEditMode ? "updating" : "creating"} task:`, response);
  //       toast.error(response?.message || `Failed to ${isEditMode ? "update" : "create"} task`);
  //     }
  //   } catch (error) {
  //     console.error('Unexpected error:', error);
  //     toast.error(`Unexpected error occurred while ${isEditMode ? "updating" : "creating"} task`);
  //   } finally {
  //     toast.dismiss(toastId);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
  
    const taskDetails = {
      id: taskData?.id || Date.now(), // Use existing ID or generate a new one
      title,
      priority,
      status,
      startTime,
      endTime,
    };
   // Optimistically update the UI
   if (isEditMode) {
    setTasks((prevTasks) => 
      prevTasks.map((task) => (task.id === taskId ? taskDetails : task))
    );
  } else {
    setTasks((prevTasks) => [...prevTasks, taskDetails]);
  }
    try {
      if (isEditMode) {
        await editTask(taskId,taskDetails,setTasks); // Call API to edit task
              window.location.reload(); // This will reload the page

        toast.success('Task updated successfully');
      } else {
        await createTask(taskDetails,setTasks); // Call API to create task
        toast.success('Task Created Successfully');
      }
  
      onSubmit(taskDetails); // Call parent handler
      handleClose();
      // window.location.reload(); // This will reload the page

    } catch (error) {
      console.error('Task operation failed:', error);
      toast.error('Something went wrong');
    }
  };
  

  return (
    <div
className={`modal fixed inset-0 z-50 overflow-y-auto bg-gray-400 bg-opacity-75 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}
    >
      <div className="modal-content relative bg-white rounded-lg shadow-lg mx-auto p-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isEditMode ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(parseInt(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>

            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="finished">Finished</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-medium mb-1">
              Start Time:
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-sm font-medium mb-1">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-fit mr-2"
            >
              {isEditMode ? 'Save Changes' : 'Add Task'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg w-fit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
