package com.example.cookingsystem.repositories;

import com.example.cookingsystem.models.LearningProgress;
import com.example.cookingsystem.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LearningProgressRepository extends MongoRepository<LearningProgress, String> {
    List<LearningProgress> findByUser(User user);
    List<LearningProgress> findByUserAndIsArchived(User user, boolean isArchived);
}