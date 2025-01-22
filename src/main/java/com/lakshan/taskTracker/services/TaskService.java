package com.lakshan.taskTracker.services;

import com.lakshan.taskTracker.entity.Task;
import com.lakshan.taskTracker.models.CommonResponse;
import com.lakshan.taskTracker.models.TaskRequest;
import com.lakshan.taskTracker.models.TaskResponse;
import com.lakshan.taskTracker.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public CommonResponse addTask(TaskRequest taskRequest) throws Exception {
        Task task = new Task();
        CommonResponse commonResponse = new CommonResponse();

        try {
            task.setTitle(taskRequest.getTitle());
            task.setDescription(taskRequest.getDescription());
            task.setStatus(taskRequest.getStatus());
            task.setPriority(taskRequest.getPriority());
            task.setDueDate(taskRequest.getDueDate());
            task.setUser(taskRequest.getUser());

            Task task1;
            task1 = taskRepository.saveAndFlush(task);
            System.out.println("After Inserting:" + task1);

            TaskResponse taskResponse = new TaskResponse();
            taskResponse.setTitle(task1.getTitle());
            taskResponse.setDescription(task1.getDescription());
            taskResponse.setStatus(task1.getStatus());
            taskResponse.setPriority(task1.getPriority());
            taskResponse.setDueDate(task1.getDueDate());
            taskResponse.setUser(task1.getUser());

            commonResponse.setPayLoad(taskResponse);
            commonResponse.setStatusDescription("SUCCESSFULLY ADDED...");
            commonResponse.setTimeStamp(String.valueOf(LocalDateTime.now()));

        } catch (Exception e) {
            System.out.println("Exception" + e.getMessage());
            throw new Exception(e.getMessage());
        }

        return commonResponse;
    }


    public Task getTaskById(long taskId) {
        return taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task Not Found with id: " + taskId));
    }


    public List<Task> getTasks() {
        return taskRepository.findAll();
    }


    public List<Task> getTaskByUserId(long userId) {
        return taskRepository.findByUserId(userId);
    }

    public CommonResponse updateTask(TaskRequest taskRequest) throws Exception {
        Task task = new Task();
        CommonResponse commonResponse = new CommonResponse();

        try {
            task.setTitle(taskRequest.getTitle());
            task.setDescription(taskRequest.getDescription());
            task.setStatus(taskRequest.getStatus());
            task.setPriority(taskRequest.getPriority());
            task.setDueDate(taskRequest.getDueDate());

            Task task2;
            task2 = taskRepository.saveAndFlush(task);
            System.out.println("After Updating:" + task2);

            TaskResponse taskResponse = new TaskResponse();
            taskResponse.setTitle(task2.getTitle());
            taskResponse.setDescription(task2.getDescription());
            taskResponse.setStatus(task2.getStatus());
            taskResponse.setPriority(task2.getPriority());
            taskResponse.setDueDate(task2.getDueDate());

            commonResponse.setPayLoad(taskResponse);
            commonResponse.setStatusDescription("SUCCESSFULLY UPDATED...");
            commonResponse.setTimeStamp(String.valueOf(LocalDateTime.now()));

        } catch (Exception e) {
            System.out.println("Exception" + e.getMessage());
            throw new Exception(e.getMessage());
        }
        return commonResponse;

//        Task existingTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task Not Found with id: " + taskId));
//        existingTask.setTitle(task.getTitle());
//        existingTask.setDescription(task.getDescription());
//        existingTask.setStatus(task.getStatus());
//        existingTask.setPriority(task.getPriority());
//        existingTask.setDueDate(task.getDueDate());
//        taskRepository.save(existingTask);
    }


    public void deleteTask(long taskId) {
        Task existingTask = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task Not Found with id: " + taskId));
        taskRepository.deleteById(taskId);
    }

}



