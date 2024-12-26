package com.lakshan.taskTracker.services;

import com.lakshan.taskTracker.entity.User;
import com.lakshan.taskTracker.models.CommonResponse;
import com.lakshan.taskTracker.models.UserRequest;
import com.lakshan.taskTracker.models.UserResponse;
import com.lakshan.taskTracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public CommonResponse addUser(UserRequest userRequest) throws Exception {

        User user = new User();
        CommonResponse commonResponse = new CommonResponse();

        try {
            user.setUserName(userRequest.getUserName());
            user.setEmail(userRequest.getEmail());
            user.setPassword(userRequest.getPassword());

            User user1;
            user1 = userRepository.saveAndFlush(user);
            System.out.println("After Inserting:" + user1);

            UserResponse userResponse = new UserResponse();
            userResponse.setUserName(user1.getUserName());
            userResponse.setEmail(user1.getEmail());
            userResponse.setPassword(user1.getPassword());

            commonResponse.setPayLoad(userResponse);
            commonResponse.setStatusDescription("SUCCESSFULLY ADDED...");
            commonResponse.setTimeStamp(String.valueOf(LocalDateTime.now()));

        } catch (Exception e) {
            System.out.println("Exception" + e.getMessage());
            throw new Exception(e.getMessage());
        }

        return commonResponse;
    }

    public User getUserById(long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found with id: " + userId));
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }


    public CommonResponse updateUser(UserRequest userRequest) throws Exception {
        User user = new User();
        CommonResponse commonResponse = new CommonResponse();

        try {
            user.setEmail(userRequest.getEmail());
            user.setPassword(userRequest.getPassword());
            user.setUserName(userRequest.getUserName());

            User user2;
            user2 = userRepository.saveAndFlush(user);
            System.out.println("After Updating:" + user2);

            UserResponse userResponse = new UserResponse();
            userResponse.setEmail(user2.getEmail());
            userResponse.setPassword(user2.getPassword());
            userResponse.setUserName(user2.getUserName());

            commonResponse.setPayLoad(userResponse);
            commonResponse.setStatusDescription("SUCCESSFULLY UPDATED...");
            commonResponse.setTimeStamp(String.valueOf(LocalDateTime.now()));

        } catch (Exception e) {
            System.out.println("Exception" + e.getMessage());
            throw new Exception(e.getMessage());
        }
        return commonResponse;

//        User existingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found with id: " + userId));
//        existingUser.setUserName(user.getUserName());
//        existingUser.setEmail(user.getEmail());
//        existingUser.setPassword(user.getPassword());
//        userRepository.save(existingUser);
    }


    public void deleteUser(long userId) {
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        userRepository.deleteById(userId);
    }
}
