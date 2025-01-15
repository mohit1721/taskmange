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
  // console.log('Token in API Call [inside modal] (Create Task):', token);
  // console.log("token in modal", token)
  const [errors, setErrors] = useState({
    title: '',
    priority: '',
    status: '',
    startTime: '',
    endTime: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // To track submission attempt

  const validateForm = (taskDetails) => {
    const newErrors = {};
    
    // Validate title
    if (!taskDetails.title || taskDetails.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
    }
    
    // Validate priority
    if (!taskDetails.priority) {
      newErrors.priority = 'Priority must be selected.';
    }
  
    // Validate status
    if (!taskDetails.status) {
      newErrors.status = 'Status must be selected.';
    }
  
    // Validate startTime and endTime
    if (!taskDetails.startTime) {
      newErrors.startTime = 'Start time is required.';
    }
    if (!taskDetails.endTime) {
      newErrors.endTime = 'End time is required.';
    }
   // Validate that endTime is after startTime
   if (taskDetails.startTime && taskDetails.endTime && new Date(taskDetails.endTime) < new Date(taskDetails.startTime)) {
    newErrors.endTime = 'End time must be greater than start time.';
    toast.error('End Time must be greater than Start Time');
  }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   // Set the flag to indicate that the user has tried to submit
   setIsSubmitted(true);
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    const taskDetails = {
      // id: taskData?.id || Date.now(), // Use existing ID or generate a new one
      title,
      priority,
      status,
      startTime,
      endTime,
    };
    if (!validateForm(taskDetails)) {
      return; // Stop submission if there are validation errors
    }
    if (new Date(taskDetails.endTime) < new Date(taskDetails.startTime)) {
      toast.error('End Time must be greater than Start Time');
      return;
    }
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
        window.location.reload();
        toast.success('Task updated successfully');
      } else {
        console.log('Task Details:', taskDetails);
        await createTask(taskDetails, setTasks);
        // console.log('Created Task:', task);     
           toast.success('Task Created Successfully');
      }
  
      onSubmit(taskDetails); // Call parent handler
      handleClose();
      // window.location.reload(); // This will reload the page

    } catch (error) {
      console.error('Task operation failed:', error);
      toast.error('Something went wrong');
    }
    setIsSubmitted(false);
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
  {/* Title Field */}
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
    {isSubmitted && errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
  </div>

  {/* Priority Field */}
  <div className="mb-4">
    <label htmlFor="priority" className="block text-sm font-medium mb-1">
      Priority:
    </label>
    <select
      id="priority"
      // required
      value={priority}
      onChange={(e) => setPriority(parseInt(e.target.value))}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select Priority</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
    {isSubmitted && errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
  </div>

  {/* Status Field */}
  <div className="mb-4">
    <label htmlFor="status" className="block text-sm font-medium mb-1">
      Status:
    </label>
    <select
      id="status"
      // required
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select Status</option>
      <option value="pending">Pending</option>
      <option value="finished">Finished</option>
    </select>
    {isSubmitted && errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
  </div>

  {/* Start Time Field */}
  <div className="mb-4">
    <label htmlFor="startTime" className="block text-sm font-medium mb-1">
      Start Time:
    </label>
    <input
      type="datetime-local"
      id="startTime"
      // required
      value={startTime}
      onChange={(e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
        setEndTime((prevEndTime) => {
          const prevEndDate = new Date(prevEndTime);
          const startDate = new Date(newStartTime);
          // If endTime is earlier than startTime, set it to startTime
          return prevEndDate < startDate ? newStartTime : prevEndTime;
        });
      }}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    />
    {isSubmitted && errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
  </div>

  {/* End Time Field */}
  <div className="mb-4">
    <label htmlFor="endTime" className="block text-sm font-medium mb-1">
      End Time:
    </label>
    <input
      type="datetime-local"
      id="endTime"
      value={endTime}
      // required
      min={startTime} // Ensures endTime cannot be earlier than startTime
      onChange={(e) => setEndTime(e.target.value)}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
    />
    {isSubmitted && errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
  </div>

  {/* Submit and Cancel Buttons */}
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
