import React, { useState, useEffect  } from 'react';
import TaskCard from './TaskCard';
import SortFilter from './SortFilter';
import Pagination from './Pagination';
import TaskModal from './Modal';

const tasks = [
  { id: 1, title: 'Buy clothes', status: 'Pending', priority: 5, start: '26-Nov-24', end: '30-Nov-24' },
  { id: 2, title: 'Finish code', status: 'Finished', priority: 2, start: '25-Nov-24', end: '25-Nov-24' },
  { id: 3, title: 'Book tickets', status: 'Pending', priority: 4, start: '19-Nov-24', end: '20-Nov-24' },
];

const TaskList = () => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [tasks, setTasks] = useState([]); // Total tasks
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [tasksPerPage] = useState(3); // Number of tasks per page

  useEffect(() => {
    // Simulating fetching tasks
    const fetchTasks = async () => {
      const mockTasks = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Task ${i + 1}`,
        status: i % 2 === 0 ? 'Pending' : 'Finished',
      }));
      setTasks(mockTasks);
    };
    fetchTasks();
  }, []);

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  // const [tasks, setTasks] = useState([]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (task) => {
    setIsEditMode(true);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    // Implement delete logic here
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
      <div>
          {/* Add Task Button */}
      <button onClick={() => setIsModalOpen(true)}>Add Task</button>

{/* Task Modal */}
<TaskModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  isEditMode={isEditMode}
  taskData={selectedTask}
  onSubmit={handleAddTask}
/>


      </div>
        <h2 className="text-2xl font-bold">Task List</h2>


        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Task</button>
      </div>
       {/* Task List Component */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <SortFilter tasks={tasks} setFilteredTasks={setFilteredTasks} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* <Pagination /> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TaskList;
