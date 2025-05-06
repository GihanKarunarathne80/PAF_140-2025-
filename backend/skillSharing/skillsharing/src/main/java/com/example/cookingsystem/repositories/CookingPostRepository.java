package com.example.skillsharing.repositories;

import com.example.skillsharing.models.CookingPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CookingPostRepository extends MongoRepository<CookingPost, String> {
    List<CookingPost> findAllByDeleteStatusFalse();
    List<CookingPost> findByCreatedByIdAndDeleteStatusFalse(String userId);
    Optional<CookingPost> findByIdAndDeleteStatusFalse(String id);
}