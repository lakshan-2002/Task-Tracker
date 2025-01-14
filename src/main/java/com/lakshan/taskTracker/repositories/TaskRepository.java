package com.lakshan.taskTracker.repositories;

import com.lakshan.taskTracker.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    //    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    List<Task> findByUserId(Long userId);
}