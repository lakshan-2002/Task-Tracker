package com.lakshan.taskTracker.controller;

import com.lakshan.taskTracker.entity.Task;
import com.lakshan.taskTracker.models.CommonResponse;
import com.lakshan.taskTracker.models.TaskRequest;
import com.lakshan.taskTracker.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;


    // add a task into database
    @PostMapping("/addTask")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<CommonResponse> addTask(@RequestBody TaskRequest taskRequest) {

        CommonResponse commonResponse = new CommonResponse();
        try {
            commonResponse = taskService.addTask(taskRequest);
        } catch (Exception e) {
            commonResponse.setPayLoad(taskRequest);
            commonResponse.setStatusDescription("General Error");
            return ResponseEntity.internalServerError().body(commonResponse);
        }

        return ResponseEntity.ok().body(commonResponse);
    }

    //get a task by its id
    @GetMapping("/getTask/{taskId}")
    public Task getTask(@PathVariable long taskId) {
        return taskService.getTaskById(taskId);
    }


    //get all the tasks in the table in our database
    @GetMapping("/getAllTasks")
    public List<Task> getTasks() {
        return taskService.getTasks();
    }


    // get task by userId using a raw SQL statement
    @GetMapping("/{userId}")
    public List<Task> getTaskByUserId(@PathVariable long userId) {
        return taskService.getTaskByUserId(userId);
    }

    // update an existing task in the database
    @PutMapping("/updateTask")
    public ResponseEntity<CommonResponse> updateTask(@RequestBody TaskRequest taskRequest) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            commonResponse = taskService.updateTask(taskRequest);
        } catch (Exception e) {
            commonResponse.setPayLoad(taskRequest);
            commonResponse.setStatusDescription("General Error");
            return ResponseEntity.internalServerError().body(commonResponse);

        }
        return ResponseEntity.ok().body(commonResponse);

    }

    // delete a task from the database
    @DeleteMapping("/{taskId}")
    public String deleteTask(@PathVariable long taskId) {
        taskService.deleteTask(taskId);
        return "Task deleted with ID " + taskId;
    }


}

