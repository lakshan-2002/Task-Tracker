import React, {useState} from "react";
import "./InprogressTasks.css";

function InprogressTasks() {
    const [filter, setFilter] = useState("All");
    const [editTask, setEditTask] = useState(null); // Holds the task being edited
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tasks = [
        { title: "Build Navbar", description: "Implement navbar.", status: "In Progress", priority: "High", dueDate: "2025-01-05" },
        { title: "Create Login Page", description: "Design login page.", status: "In Progress", priority: "Medium", dueDate: "2025-01-10" },
        { title: "Set Up Database", description: "Configure MySQL.", status: "In Progress", priority: "Low", dueDate: "2023-12-25" },
        { title: "Implement Authentication", description: "Add authentication logic.", status: "In Progress", priority: "High", dueDate: "2024-01-15" },
        { title: "Optimize Performance", description: "Improve page load speed.", status: "In Progress", priority: "Medium", dueDate: "2025-01-20" },
        { title: "Presentation", description: "Communication skills.", status: "In Progress", priority: "Medium", dueDate: "2024-01-25" },
        { title: "Figma Project", description: "Making a FitEase app.", status: "In Progress", priority: "Low", dueDate: "2024-12-22" },
      ];

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
                <input type="button" value="Delete" className="task-delete-button" />
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
