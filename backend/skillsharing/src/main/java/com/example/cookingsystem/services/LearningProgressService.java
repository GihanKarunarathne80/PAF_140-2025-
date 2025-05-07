package com.example.cookingsystem.services;

import com.example.cookingsystem.dtos.LearningProgressDTOs;
import com.example.cookingsystem.exceptions.ResourceNotFoundException;
import com.example.cookingsystem.models.LearningProgress;
import com.example.cookingsystem.models.User;
import com.example.cookingsystem.repositories.LearningProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LearningProgressService {

    private final LearningProgressRepository learningProgressRepository;
    private final UserService userService;

    @Autowired
    public LearningProgressService(LearningProgressRepository learningProgressRepository,
                                   UserService userService) {
        this.learningProgressRepository = learningProgressRepository;
        this.userService = userService;
    }

    // Create
    public LearningProgressDTOs.GetLearningProgress createProgress(
            String userId,
            LearningProgressDTOs.CreateLearningProgress createDto) {

        Optional<User> user = userService.getUserById(userId);
        LearningProgress progress = new LearningProgress(
                createDto.getTitle(),
                createDto.getDescription(),
                createDto.isArchived(),
                createDto.getSatisfactionLevel(),
                user.get()
        );

        LearningProgress savedProgress = learningProgressRepository.save(progress);
        return convertToGetDto(savedProgress);
    }

    // Read (Single)
    public LearningProgressDTOs.GetLearningProgress getProgressById(String progressId) {
        LearningProgress progress = learningProgressRepository.findById(progressId)
                .orElseThrow(() -> new ResourceNotFoundException("Progress not found with id: " + progressId));
        return convertToGetDto(progress);
    }

    // Read (All for user)
    public List<LearningProgressDTOs.GetLearningProgress> getAllProgressesByUser(String userId) {
        Optional<User> user = userService.getUserById(userId);
        return learningProgressRepository.findByUser(user.get())
                .stream()
                .map(this::convertToGetDto)
                .collect(Collectors.toList());
    }

    // Read (All)
    public List<LearningProgressDTOs.GetLearningProgress> getAllProgresses() {
        return learningProgressRepository.findAll()
                .stream()
                .map(this::convertToGetDto)
                .collect(Collectors.toList());
    }

    // Update
    public LearningProgressDTOs.GetLearningProgress updateProgress(
            String progressId,
            LearningProgressDTOs.UpdateLearningProgress updateDto) {

        LearningProgress existingProgress = learningProgressRepository.findById(progressId)
                .orElseThrow(() -> new ResourceNotFoundException("Progress not found with id: " + progressId));

        existingProgress.setTitle(updateDto.getTitle());
        existingProgress.setDescription(updateDto.getDescription());
        existingProgress.setArchived(updateDto.isArchived());
        existingProgress.setSatisfactionLevel(updateDto.getSatisfactionLevel());
        existingProgress.setUpdatedAt(new Date());

        LearningProgress updatedProgress = learningProgressRepository.save(existingProgress);
        return convertToGetDto(updatedProgress);
    }

    // Delete
    public void deleteProgress(String progressId) {
        if (!learningProgressRepository.existsById(progressId)) {
            throw new ResourceNotFoundException("Progress not found with id: " + progressId);
        }
        learningProgressRepository.deleteById(progressId);
    }

    // Helper method to convert entity to DTO
    private LearningProgressDTOs.GetLearningProgress convertToGetDto(LearningProgress progress) {
        LearningProgressDTOs.GetLearningProgress dto = new LearningProgressDTOs.GetLearningProgress();
        dto.setId(progress.getId());
        dto.setTitle(progress.getTitle());
        dto.setDescription(progress.getDescription());
        dto.setArchived(progress.isArchived());
        dto.setSatisfactionLevel(progress.getSatisfactionLevel());
        dto.setCreatedAt(progress.getCreatedAt());
        dto.setUpdatedAt(progress.getUpdatedAt());

        User user = progress.getUser();
        dto.setUser(new LearningProgressDTOs.GetLearningProgress.UserInfo(
                user.getId(),
                user.getName()
        ));

        return dto;
    }
}