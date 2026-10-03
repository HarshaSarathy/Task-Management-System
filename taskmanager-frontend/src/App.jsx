import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, searchTasks } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchTasks();
    } else {
      try {
        const response = await searchTasks(query);
        setTasks(response.data);
      } catch (error) {
        console.error('Error searching tasks:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    try {
      await createTask(form);
      setForm({ title: '', description: '', status: 'PENDING', priority: 'MEDIUM', dueDate: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      await updateTask(task.id, { ...task, status: updatedStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold text-indigo-400">Task Manager</h1>
          <span className="bg-indigo-900/50 text-indigo-300 text-sm px-3 py-1 rounded-full border border-indigo-700">
            Spring Boot + React + MySQL
          </span>
        </div>

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
            </select>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <textarea
            placeholder="Task description (optional)..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-indigo-500 h-20"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Add Task
          </button>
        </form>

        {/* Search Bar */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className={`font-semibold ${task.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                      {task.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      task.priority === 'HIGH' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                      task.priority === 'MEDIUM' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && <p className="text-sm text-slate-400">{task.description}</p>}
                  {task.dueDate && <p className="text-xs text-slate-500">Due: {task.dueDate}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      task.status === 'COMPLETED'
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {task.status === 'COMPLETED' ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-rose-900/40 text-rose-300 hover:bg-rose-900/70 border border-rose-800 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;