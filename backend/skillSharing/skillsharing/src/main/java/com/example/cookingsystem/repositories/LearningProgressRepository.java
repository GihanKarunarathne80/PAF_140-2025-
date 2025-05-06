package com.example.skillsharing.repositories;

import com.example.skillsharing.models.LearningProgress;
import com.example.skillsharing.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LearningProgressRepository extends MongoRepository<LearningProgress, String> {
    List<LearningProgress> findByUser(User user);
    List<LearningProgress> findByUserAndIsArchived(User user, boolean isArchived);
}