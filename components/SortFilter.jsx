import React from 'react';

const SortFilter = ({ tasks, setFilteredTasks }) => {
  const handleSort = (type) => {
    const sorted = [...tasks].sort((a, b) => {
      if (type === 'start-asc') return a.start.localeCompare(b.start);
      if (type === 'start-desc') return b.start.localeCompare(a.start);
      return 0;
    });
    setFilteredTasks(sorted);
  };

  return (
    <div className="flex gap-4 mb-4">
      <select onChange={(e) => handleSort(e.target.value)} className="border px-2 py-1">
        <option value="">Sort by</option>
        <option value="start-asc">Start Time: ASC</option>
        <option value="start-desc">Start Time: DESC</option>
      </select>
      <select onChange={(e) => setFilteredTasks(tasks.filter(task => task.status === e.target.value))} className="border px-2 py-1">
        <option value="">Filter by Status</option>
        <option value="Pending">Pending</option>
        <option value="Finished">Finished</option>
      </select>
    </div>
  );
};

export default SortFilter;
