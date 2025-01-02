import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-purple-600 text-white">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <a href="/" className="mx-2 hover:underline">Dashboard</a>
        <a href="/task-list" className="mx-2 hover:underline">Task List</a>
      </div>
      <button className="bg-red-500 px-4 py-1 rounded hover:bg-red-600">Sign Out</button>
    </nav>
  );
};

export default Navbar;
