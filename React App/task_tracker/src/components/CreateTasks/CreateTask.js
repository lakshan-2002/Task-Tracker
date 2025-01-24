import React, { useState } from "react";
import "./CreateTask.css"; // Create this file for styling the form

const CreateTask = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task Submitted:", taskData);
    // Here, you can call an API to send task data to the backend

  try {
      const user = JSON.parse(localStorage.getItem("user")); // Safely parse user from localStorage
      if (!user || !user.id) {
          throw new Error("User not found. Please log in again.");
      }
  
      // Add the userId to taskData
      const taskWithUser = {
          ...taskData,
          user // Add the required userId
      };
  
      // Pass taskWithUser to addTask
      await addTask(taskWithUser);
  
      // Reset task data on success
      setTaskData({
          title: "",
          description: "",
          status: "Pending",
          priority: "Medium",
          dueDate: "",
      });
  
      console.log("✅ Task submitted successfully");
    } catch (error) {
      console.error("❌ Error submitting task:", error);
    }
  
  };

  return (
    <div className="create-task-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTask;
