// src/redux/slices/taskSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  selectedTask: null, // For editing tasks
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { id: nanoid(), ...action.payload };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    selectTask: (state, action) => {
      state.selectedTask = state.tasks.find((task) => task.id === action.payload) || null;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
  },
});

// Export actions
export const { addTask, updateTask, deleteTask, selectTask, clearSelectedTask } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
