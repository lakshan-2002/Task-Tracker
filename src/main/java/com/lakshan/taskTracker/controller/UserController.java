package com.lakshan.taskTracker.controller;

import com.lakshan.taskTracker.entity.User;
import com.lakshan.taskTracker.models.CommonResponse;
import com.lakshan.taskTracker.models.UserRequest;
import com.lakshan.taskTracker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<CommonResponse> addUser(@RequestBody UserRequest userRequest) {

        CommonResponse commonResponse = new CommonResponse();
        try {
            commonResponse = userService.addUser(userRequest);
        } catch (Exception e) {
            commonResponse.setPayLoad(userRequest);
            commonResponse.setStatusDescription("General Error");
            return ResponseEntity.internalServerError().body(commonResponse);
        }

        return ResponseEntity.ok().body(commonResponse);
    }

    @GetMapping("/getAllUsers")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<CommonResponse> updateUser(@RequestBody UserRequest userRequest) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            commonResponse = userService.updateUser(userRequest);
        } catch (Exception e) {
            commonResponse.setPayLoad(userRequest);
            commonResponse.setStatusDescription("General Error");
            return ResponseEntity.internalServerError().body(commonResponse);
        }

        return ResponseEntity.ok().body(commonResponse);
//        userService.updateUser(userId, user);
//        return "User updated successfully.";
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return "User deleted with ID " + userId;
    }


}

