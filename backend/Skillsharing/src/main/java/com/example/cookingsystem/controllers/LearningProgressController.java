package com.example.cookingsystem.controllers;

import com.example.cookingsystem.dtos.LearningProgressDTOs;
import com.example.cookingsystem.services.LearningProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progresses")
public class LearningProgressController {

    private final LearningProgressService learningProgressService;

    @Autowired
    public LearningProgressController(LearningProgressService learningProgressService) {
        this.learningProgressService = learningProgressService;
    }

    // Create
    @PostMapping("/{userId}")
    public ResponseEntity<LearningProgressDTOs.GetLearningProgress> createProgress(
            @PathVariable String userId,
            @RequestBody LearningProgressDTOs.CreateLearningProgress createDto) {

        LearningProgressDTOs.GetLearningProgress progress =
                learningProgressService.createProgress(userId, createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(progress);
    }

    // Read (Single)
    @GetMapping("/{progressId}")
    public ResponseEntity<LearningProgressDTOs.GetLearningProgress> getProgressById(
            @PathVariable String progressId) {

        LearningProgressDTOs.GetLearningProgress progress =
                learningProgressService.getProgressById(progressId);
        return ResponseEntity.ok(progress);
    }

    // Read (All for user)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningProgressDTOs.GetLearningProgress>> getAllProgressesByUser(
            @PathVariable String userId) {

        List<LearningProgressDTOs.GetLearningProgress> progresses =
                learningProgressService.getAllProgressesByUser(userId);
        return ResponseEntity.ok(progresses);
    }

    // Read (All)
    @GetMapping
    public ResponseEntity<List<LearningProgressDTOs.GetLearningProgress>> getAllProgresses() {
        List<LearningProgressDTOs.GetLearningProgress> progresses =
                learningProgressService.getAllProgresses();
        return ResponseEntity.ok(progresses);
    }

    // Update
    @PutMapping("/{progressId}")
    public ResponseEntity<LearningProgressDTOs.GetLearningProgress> updateProgress(
            @PathVariable String progressId,
            @RequestBody LearningProgressDTOs.UpdateLearningProgress updateDto) {

        LearningProgressDTOs.GetLearningProgress updatedProgress =
                learningProgressService.updateProgress(progressId, updateDto);
        return ResponseEntity.ok(updatedProgress);
    }

    // Delete
    @DeleteMapping("/{progressId}")
    public ResponseEntity<Void> deleteProgress(@PathVariable String progressId) {
        learningProgressService.deleteProgress(progressId);
        return ResponseEntity.noContent().build();
    }
}