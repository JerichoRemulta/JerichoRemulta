import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const handleInputChange = (e) => {
      setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
      if (taskInput.trim() !== '') {
          setTasks([...tasks, { id: Date.now(), task: taskInput, status: 'Pending' }]);
          setTaskInput('');
      }
  };

  const handleEditTask = (id) => {
      const taskToEdit = tasks.find(task => task.id === id);
      if (taskToEdit) {
          setEditingTaskId(id);
          setEditingTaskText(taskToEdit.task);
      }
  };

  const handleSaveTask = () => {
      if (editingTaskId !== null) {
          setTasks(tasks.map(task => {
              if (task.id === editingTaskId) {
                  return { ...task, task: editingTaskText };
              }
              return task;
          }));
          setEditingTaskId(null);
          setEditingTaskText('');
      }
  };

  const handleDeleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
  };

  const handleUpdateStatus = (id) => {
      setTasks(tasks.map(task => {
          if (task.id === id) {
              return { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' };
          }
          return task;
      }));
  };

  return (
      <div>
          <h1>To-Do List</h1>
          <div>
              <input type="text" value={taskInput} onChange={handleInputChange} />
              <button onClick={handleAddTask}>Create Task</button>
          </div>
          <ul>
              {tasks.map(task => (
                  <li key={task.id}>
                      {task.id === editingTaskId ? (
                          <input
                              type="text"
                              value={editingTaskText}
                              onChange={(e) => setEditingTaskText(e.target.value)}
                          />
                      ) : (
                          <span>{task.task}</span>
                      )}
                      - {task.status}
                      {task.id === editingTaskId ? (
                          <>
                              <button onClick={handleSaveTask}>Save</button>
                              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                          </>
                      ) : (
                          <>
                              <button onClick={() => handleEditTask(task.id)}>Edit</button>
                              <button onClick={() => handleUpdateStatus(task.id)}>Update</button>
                              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                          </>
                      )}
                  </li>
              ))}
          </ul>
      </div>
  );
}

export default TodoList;