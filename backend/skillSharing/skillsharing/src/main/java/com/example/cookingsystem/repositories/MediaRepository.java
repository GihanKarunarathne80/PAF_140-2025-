package com.example.skillsharing.repositories;

import com.example.skillsharing.models.Media;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MediaRepository extends MongoRepository<Media, String> {
    List<Media> findByRelatedPostIdAndDeleteStatusFalse(String postId);
    List<Media> findAllByDeleteStatusFalse();
    Optional<Media> findByIdAndDeleteStatusFalse(String id);
}