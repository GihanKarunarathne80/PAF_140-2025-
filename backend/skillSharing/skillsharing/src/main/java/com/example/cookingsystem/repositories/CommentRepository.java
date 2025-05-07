package com.example.skillsharing.repositories;

import com.example.skillsharing.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByCommentedOnIdAndDeleteStatusFalse(String postId);
    List<Comment> findAllByDeleteStatusFalse();
    Optional<Comment> findByIdAndDeleteStatusFalse(String id);
    List<Comment> findByCommentedByIdAndDeleteStatusFalse(String userId);
}