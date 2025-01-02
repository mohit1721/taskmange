
'use client'

import React, { Suspense, useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { getTaskLists } from '@/services/operations/taskAPI';
import TaskCard from '@/components/TaskCard';
import TaskModal from '../../components/Modal'; // Import the TaskModal component
// import {toast} from 'react-hot-toast'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link  from 'next/link';
// import { logout } from '@/services/operations/authAPI';
import Tabs from '@/components/Tabs';
// import { Suspense } from 'react'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [filters, setFilters] = useState({
    
      sortBy: searchParams.get('sortBy') || 'createdAt',
      order: searchParams.get('order') || 'desc',
      status: searchParams.get('status') || 'all',
      priority: searchParams.get('priority') || 'all',
      limit: 10,
      page: parseInt(searchParams.get('page')) || 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [finalTaks, setFinalTasks] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Loading state

    const token = useSelector((state) => state.auth.token); // Get token from Redux store
console.log("token in tasklist page", token);
     // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value);
      }
        });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, router, pathname]);

  // Fetch tasks based on filters


    useEffect(() => {
      // Fetch task lists asynchronously
      const fetchTaskLists = async () => {
        setLoading(true); // ✅ Start loading

        try {
             // Clean params: remove empty or undefined keys
      const params = {
        sortBy: filters.sortBy,
        order: filters.order,
        status: filters.status,
        priority: filters.priority,
        page: currentPage,
        limit: filters.limit,
      };

      const cleanedParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== "")
      );

          const response = await getTaskLists(token, cleanedParams);
  
          console.log('All Tasks Data Final:', response);

          setFinalTasks(response);
          setTasks(response?.tasks);
          setTotalTasks(response?.totalTasks);

          if (response) {
            setTasks(response?.tasks); // Set the task list
            setTotalTasks(response.totalTasks); // Set the total number of tasks
            setCurrentPage(response.currentPage); // Update the current page
          }
        } catch (error) {
          console.error('Error fetching task lists:', error);
        }finally{
          setLoading(false); // ✅ Stop loading

        }
      };
  
      // Call fetchTaskLists if token is available
      if (token) {
        fetchTaskLists();
      }
    }, [ filters]); // Dependency array ensures it re-runs on token, filters, or page change
  
   // Pagination
   const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };




  // 🛠️ Handle Filter Changes
 
 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    setFilters((prev) => {
      let updatedFilters = { ...prev, [name]: value, page: 1 };
  
      // Handle combined sortBy and order
      if (name === 'sortBy' && value) {
        const [field, order] = value.split('_');
        updatedFilters.sortBy = field;
        updatedFilters.order = order || 'desc'; // Default to 'desc' if order isn't provided
      }
  
      return updatedFilters;
    });
  };
  
 
    const totalPages = Math.ceil(totalTasks / filters.limit);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
  
    const handleOpenAddTaskModal = () => {
      setIsModalOpen(true);
      setSelectedTask(null); // Clear any selected task
    };

    const handleAddTask = (newTask) => {
      // Assuming newTask comes with an id (you might need to generate it)
      setTasks([...tasks, newTask]);
      setIsModalOpen(false);
    };
    const handleEditTask = (updatedTask) => {
      handleOpenAddTaskModal()
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setIsModalOpen(false);
    };
    const handleTaskSubmit = async (task) => {
      if (selectedTask) {
        // Edit Task
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === task.id ? task : t))
        );
        // toast.success('Task updated successfully');
      } else {
        // Add Task
        setTasks((prevTasks) => [...prevTasks, task]);
        // toast.success('Task Created Successfully');
      }
      setIsModalOpen(false);
      setSelectedTask(null);
    };
    
    return (

<Suspense fallback={<div>Loading Task List...</div>}>
<div className="container mx-auto p-11 h-full">
       
       <Tabs
     tab1Text="Dashboard"
     tab2Text="Task List"
     router={router}
   />
       <button 
             onClick={handleOpenAddTaskModal}

       className="bg-blue-500 hover:bg-blue-700 text-white w-fit font-bold py-2 px-4 rounded mb-4">+ Add task</button>

       <div className="flex justify-end mb-4">
       <div className="relative ml-2">
       <select 
           name="sortBy" 
           // value={filters.sortBy} 
           value={`${filters.sortBy}_${filters.order}`}  // Combining sortBy and order for selected value

           onChange={handleFilterChange} 
           className="border p-2 rounded"
       >
           <option value="createdAt_desc">Sort By</option>
           <option value="startTime_asc">Start Time: Asc</option>
           <option value="startTime_desc">Start Time: Desc</option>
           <option value="endTime_asc">End Time: Asc</option>
           <option value="endTime_desc">End Time: Desc</option>
           <option value="updatedAt_desc">Last Updated: Desc</option> {/* ✅ Default */}
       <option value="updatedAt_asc">Last Updated: Asc</option>
       <option value="createdAt_desc">Created At: Desc</option>
       <option value="createdAt_asc">Created At: Asc</option>
       </select>
   </div>

           <div className="relative ml-2">

           <select 
 name="priority" 
 value={filters.priority} 
 onChange={handleFilterChange} 
 className="border p-2 rounded"
>
 <option value="all">All Priorities</option>
 {[1, 2, 3, 4, 5].map(p => (
   <option key={p} value={p}>Priority {p}</option>
 ))}
 <option value="all">Remove Filter</option>
</select>

           </div>

         <div className="relative ml-2">
         <select name="status" value={filters.status} onChange={handleFilterChange} className="border p-2 rounded">
         
         <option value="pending">Pending</option>
         <option value="finished">Finished</option>
         <option value="all">All Statuses</option>
       </select>
             </div>

       </div>

       <div>
     {loading ? ( // ✅ Show loading spinner if data is being fetched
       <div className="text-center text-blue-500 font-semibold">
         Loading tasks...
       </div>
     ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {tasks && tasks.length > 0 ? (
           tasks.map(task => (
             <TaskCard key={task._id} task={task} />
           ))
         ) : (
           <div className="text-center mx-auto text-red-500">
             No Tasks
           </div>
         )}
       </div>
     )}
   </div>
     
{/* pagination */}
     

     <div className="flex justify-between items-center mt-4">
       <button
         onClick={() => handlePageChange(filters.page - 1)}
         disabled={filters.page <= 1}
         className="bg-blue-500 text-white w-fit px-4 py-2 rounded disabled:bg-gray-300"
       >
         Previous
       </button>
       <span>
         Page {filters.page} of { totalPages}
       </span>
       <button
         onClick={() => handlePageChange(filters.page + 1)}
         disabled={filters.page >= totalPages}
         className="bg-blue-500 w-fit text-white px-4 py-2 rounded disabled:bg-gray-300"
       >
         Next
       </button>
     </div>

<div className='w-full flex justify-center'>
<TaskModal 
     
     isOpen={isModalOpen} 
     onClose={() => setIsModalOpen(false)} 
     isEditMode={!!selectedTask} 
     taskData={selectedTask} 
     // onSubmit={!!selectedTask ? handleEditTask : handleAddTask} 
     onSubmit={handleTaskSubmit} // Unified submit handler

   />
</div>
    


   </div>
</Suspense>
       
    );
};

export default TaskList;