package com.example.cookingsystem.repositories;

import com.example.cookingsystem.models.Plan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends MongoRepository<Plan, String> {
    // Find all plans by user id
    List<Plan> findByUserId(String userId);

    // Find all public plans
    List<Plan> findByIsPublicTrue();

    // Find public plans by user id
    List<Plan> findByUserIdAndIsPublicTrue(String userId);

    // Find plans by title containing keyword
    List<Plan> findByTitleContainingIgnoreCase(String keyword);
}