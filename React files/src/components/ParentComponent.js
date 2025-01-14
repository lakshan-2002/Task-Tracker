import React from "react";
import CreateTask from "components/CreateTasks/CreateTask"; // Ensure the correct path

const ParentComponent = () => {
  // Add Task (POST)
  const postData = async (taskData) => {
    try {
      const response = await fetch("https://localhost:8080/task/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.statusText}`);
      }
      console.log("Task added successfully:", result);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update Task (PUT)
  const putData = async (taskData) => {
    try {
      const response = await fetch("https://localhost:8080/task/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.statusText}`);
      }
      console.log("Task updated successfully:", result);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task (DELETE)
  const deleteData = async (taskId) => {
    try {
      const response = await fetch(`https://localhost:8080/task/deleteTask/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting task: ${response.statusText}`);
      }
      console.log(`Task with ID ${taskId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return <CreateTask postData={postData} putData={putData} deleteData={deleteData} />;
};

export default ParentComponent;
