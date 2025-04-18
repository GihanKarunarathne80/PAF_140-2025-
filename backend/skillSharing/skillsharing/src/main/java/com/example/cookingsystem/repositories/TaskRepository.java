package com.example.skillsharing.repositories;

import com.example.skillsharing.models.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findAllByDeleteStatusFalse();
    Optional<Task> findByIdAndDeleteStatusFalse(String id);
    List<Task> findByTypeAndDeleteStatusFalse(String type);
}