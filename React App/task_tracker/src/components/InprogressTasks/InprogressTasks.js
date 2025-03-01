import React, {useState, useEffect} from "react";
import "./InprogressTasks.css";

function InprogressTasks({ deleteTask }) {
    const [filter, setFilter] = useState("All");
    const [editTask, setEditTask] = useState(null); // Holds the task being edited
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState(""); // For showing success/error messages
    const [error, setError] = useState(""); // For error handling

    const baseurl = "http://localhost:8080";

    const fetchData = async () => {
      try {
        const response = await fetch(`${baseurl}/task/getTasksByStatus?status=In Progress`);
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const result = await response.json();
        setTasks(result);
      } catch (error) {
        setError(error.message);
      }
    };
    
    useEffect(() => {
      fetchData(); // Fetch tasks when the component mounts
    }, []);

    const filteredTasks = filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditTask(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Logic to save the updated task
    console.log("Task saved:", editTask);
    setIsModalOpen(false);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId);
        await fetchData();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleChange = (field, value) => {
    setEditTask({ ...editTask, [field]: value });
  };

    return (
        <div className="inprogress-tasks-container">
          <div className="inprogress-tasks-header">
            <h2 className="inprogress-tasks-title">In Progress Tasks</h2>
            <label className="task-filter-label">Filter by Priority:</label>
            <select className="task-filter" value={filter} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="task-container">
            {filteredTasks.map((task, index) => (
              <div className="task-box" key={index}>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">Description: {task.description}</p>
                <p className="task-status">Status: {task.status}</p>
                <p className="task-priority">Priority: {task.priority}</p>
                <p className="task-due-date">Due Date: {task.dueDate}</p>
                <input type="button" value="Edit" className="task-edit-button" onClick={() => handleEdit(task)}/>
                <input type="button" value="Delete" className="task-delete-button" onClick={() => handleDelete(task.id)} />
              </div>
            ))}
          </div>
        {isModalOpen && editTask && (
          <div className="modal">
            <div className="modal-content">
              <h3 align = "center">Edit Task</h3>
              <form>
                <label>Title:</label>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />

                <label>Description:</label>
                <textarea
                  value={editTask.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                ></textarea>

                <label>Status:</label>
                <select
                  value={editTask.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <label>Priority:</label>
                <select
                  value={editTask.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <label>Due Date:</label>
                <input
                  type="date"
                  value={editTask.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </form>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="close-button" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    
  );
}

export default InprogressTasks;
