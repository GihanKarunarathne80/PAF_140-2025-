package com.example.cookingsystem.services;

import com.example.cookingsystem.dtos.CreatePlanDTO;
import com.example.cookingsystem.dtos.PlanDTO;
import com.example.cookingsystem.models.Plan;
import com.example.cookingsystem.models.User;
import com.example.cookingsystem.repositories.PlanRepository;
import com.example.cookingsystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all plans
    public List<PlanDTO> getAllPlans() {
        List<Plan> plans = planRepository.findAll();
        return plans.stream()
                .map(PlanDTO::new)
                .collect(Collectors.toList());
    }

    // Get all public plans
    public List<PlanDTO> getAllPublicPlans() {
        List<Plan> plans = planRepository.findByIsPublicTrue();
        return plans.stream()
                .map(PlanDTO::new)
                .collect(Collectors.toList());
    }

    // Get plan by id
    public PlanDTO getPlanById(String id) {
        Optional<Plan> planOptional = planRepository.findById(id);
        return planOptional.map(PlanDTO::new).orElse(null);
    }

    // Get plans by user id
    public List<PlanDTO> getPlansByUserId(String userId) {
        List<Plan> plans = planRepository.findByUserId(userId);
        return plans.stream()
                .map(PlanDTO::new)
                .collect(Collectors.toList());
    }

    // Get public plans by user id
    public List<PlanDTO> getPublicPlansByUserId(String userId) {
        List<Plan> plans = planRepository.findByUserIdAndIsPublicTrue(userId);
        return plans.stream()
                .map(PlanDTO::new)
                .collect(Collectors.toList());
    }

    // Create new plan
    public PlanDTO createPlan(CreatePlanDTO createPlanDTO) {
        Optional<User> userOptional = userRepository.findById(createPlanDTO.getUserId());
        if (!userOptional.isPresent()) {
            return null; // User not found
        }

        User user = userOptional.get();

        Plan plan = new Plan();
        plan.setUser(user);
        plan.setTitle(createPlanDTO.getTitle());
        plan.setDescription(createPlanDTO.getDescription());
        plan.setStartDate(createPlanDTO.getStartDate());
        plan.setEndDate(createPlanDTO.getEndDate());
        plan.setPublic(createPlanDTO.isPublic());

        // Convert topic DTOs to topics
        if (createPlanDTO.getTopics() != null) {
            List<Plan.Topic> topics = new ArrayList<>();

            for (PlanDTO.TopicDTO topicDTO : createPlanDTO.getTopics()) {
                Plan.Topic topic = new Plan.Topic();
                topic.setTitle(topicDTO.getTitle());
                topic.setDescription(topicDTO.getDescription());
                topic.setDeadlineDate(topicDTO.getDeadlineDate());

                // Convert resource DTOs to resources
                if (topicDTO.getResources() != null) {
                    List<Plan.Resource> resources = new ArrayList<>();

                    for (PlanDTO.ResourceDTO resourceDTO : topicDTO.getResources()) {
                        Plan.Resource resource = new Plan.Resource();
                        resource.setName(resourceDTO.getName());
                        resource.setUrl(resourceDTO.getUrl());
                        resource.setType(resourceDTO.getType());
                        resources.add(resource);
                    }

                    topic.setResources(resources);
                }

                topics.add(topic);
            }

            plan.setTopics(topics);
        }

        Plan savedPlan = planRepository.save(plan);
        return new PlanDTO(savedPlan);
    }

    // Update plan
    public PlanDTO updatePlan(String id, CreatePlanDTO updatePlanDTO) {
        Optional<Plan> planOptional = planRepository.findById(id);
        if (!planOptional.isPresent()) {
            return null; // Plan not found
        }

        Plan plan = planOptional.get();

        // Check if the user exists if userId is changed
        if (!plan.getUser().getId().equals(updatePlanDTO.getUserId())) {
            Optional<User> userOptional = userRepository.findById(updatePlanDTO.getUserId());
            if (!userOptional.isPresent()) {
                return null; // User not found
            }
            plan.setUser(userOptional.get());
        }

        plan.setTitle(updatePlanDTO.getTitle());
        plan.setDescription(updatePlanDTO.getDescription());
        plan.setStartDate(updatePlanDTO.getStartDate());
        plan.setEndDate(updatePlanDTO.getEndDate());
        plan.setPublic(updatePlanDTO.isPublic());

        // Convert topic DTOs to topics
        if (updatePlanDTO.getTopics() != null) {
            List<Plan.Topic> topics = new ArrayList<>();

            for (PlanDTO.TopicDTO topicDTO : updatePlanDTO.getTopics()) {
                Plan.Topic topic = new Plan.Topic();
                topic.setTitle(topicDTO.getTitle());
                topic.setDescription(topicDTO.getDescription());
                topic.setDeadlineDate(topicDTO.getDeadlineDate());

                // Convert resource DTOs to resources
                if (topicDTO.getResources() != null) {
                    List<Plan.Resource> resources = new ArrayList<>();

                    for (PlanDTO.ResourceDTO resourceDTO : topicDTO.getResources()) {
                        Plan.Resource resource = new Plan.Resource();
                        resource.setName(resourceDTO.getName());
                        resource.setUrl(resourceDTO.getUrl());
                        resource.setType(resourceDTO.getType());
                        resources.add(resource);
                    }

                    topic.setResources(resources);
                }

                topics.add(topic);
            }

            plan.setTopics(topics);
        }

        Plan savedPlan = planRepository.save(plan);
        return new PlanDTO(savedPlan);
    }

    // Delete plan
    public boolean deletePlan(String id) {
        Optional<Plan> planOptional = planRepository.findById(id);
        if (!planOptional.isPresent()) {
            return false;
        }

        planRepository.deleteById(id);
        return true;
    }

    // Search plans by title
    public List<PlanDTO> searchPlansByTitle(String keyword) {
        List<Plan> plans = planRepository.findByTitleContainingIgnoreCase(keyword);
        return plans.stream()
                .map(PlanDTO::new)
                .collect(Collectors.toList());
    }
}