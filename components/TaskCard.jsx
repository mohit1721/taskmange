'use client'
import React ,{useState}from 'react';
import TaskModal from './Modal';
import { deleteTask } from '@/services/operations/taskAPI';

const TaskCard = ({ task }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: '2-digit', // Changed to 2-digit year
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Added for AM/PM
        });
    };
// State to track the modal visibility and selected task
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
const [isEditMode, setIsEditMode] = useState(false)
// Function to handle editing a task
const handleEditClick = (task) => {
  setSelectedTask(task); // Set the selected task for editing
  setIsModalOpen(true); // Open the modal
  setIsEditMode(true);
};

  
const taskId = task._id;//

const handleDelete = async () => {
    try {
        // const taskId = task._id;//
        // console.log("task Id: FE " + task._id);
       await deleteTask(taskId);
       window.location.reload(); // This will reload the page

}
catch(err)
{
      console.log('Error deleting task:', err);

}
}
// Function to close the modal
const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedTask(null); // Reset selected task
};


    return (
        <div className="border bg-gray-200 w-auto p-4 shadow-lg rounded-lg"> {/* Added shadow for depth */}
            {/* <p className="text-gray-500 text-sm">Task ID: {task.taskId}</p>  */}
            {/* Added text-sm and gray color */}
            <h2 className="font-bold text-lg text-indigo-700">{task.title}</h2> {/* styled title */}
            <div className="flex items-center space-x-2 my-2"> {/* Added spacing between status and priority */}
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-bold ${task.status === 'pending' ? 'bg-pink-100 text-pink-600' : 'bg-green-100 text-green-600'}`}>
                    {task.status}
                </span>
                <p className="text-yellow-500 text-sm">Priority: {task.priority}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-2"> {/* Used grid for layout */}
                <div>
                    <p className="font-medium">Start</p>
                    <p>{formatDate(task.startTime)}</p>
                </div>
                <div>
                    <p className="font-medium">End</p>
                    <p>{formatDate(task.endTime)}</p>
                </div>
            </div>
            <div className="flex space-x-2 justify-end"> {/* Aligned buttons to the right */}
                <button 
                 onClick={() => handleEditClick(task)}
                className="border rounded px-3 bg-blue-500 py-1 text-sm text-gray-600 w-fit hover:bg-gray-100">Edit</button> {/* styled buttons */}
                <button 
                      onClick={handleDelete}

                className="border rounded px-3 bg-red-200 py-1 text-sm text-red-600 w-fit hover:bg-red-100">Delete</button> {/* styled buttons */}
           
           
            </div>

            {/* Modal Component for/Edit */}
<TaskModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  isEditMode={!!selectedTask}
  taskId={taskId}
  taskData={selectedTask} // Pass the selected task as prop
  onSubmit={selectedTask ? () => handleEditClick(task) : null}

/>
        </div>
    );
};

export default TaskCard;

/* isEditMode={!!selectedTask}
Purpose: This boolean prop indicates whether the modal is in "edit mode" or "create mode."
Value: The result of !!selectedTask (double negation converts any truthy/falsy value to true/false).
true if selectedTask contains a task (edit mode).
false if selectedTask is null or undefined (create mode)
*/