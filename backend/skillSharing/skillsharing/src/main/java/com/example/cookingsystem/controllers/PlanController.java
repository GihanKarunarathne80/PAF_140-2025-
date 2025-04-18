package com.example.skillsharing.controllers;

import com.example.skillsharing.dtos.CreatePlanDTO;
import com.example.skillsharing.dtos.PlanDTO;
import com.example.skillsharing.services.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired
    private PlanService planService;

    // Get all plans
    @GetMapping
    public ResponseEntity<List<PlanDTO>> getAllPlans() {
        List<PlanDTO> plans = planService.getAllPlans();
        return ResponseEntity.ok(plans);
    }

    // Get all public plans
    @GetMapping("/public")
    public ResponseEntity<List<PlanDTO>> getAllPublicPlans() {
        List<PlanDTO> plans = planService.getAllPublicPlans();
        return ResponseEntity.ok(plans);
    }

    // Get plan by id
    @GetMapping("/{id}")
    public ResponseEntity<PlanDTO> getPlanById(@PathVariable String id) {
        PlanDTO plan = planService.getPlanById(id);
        if (plan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(plan);
    }

    // Get plans by user id
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PlanDTO>> getPlansByUserId(@PathVariable String userId) {
        List<PlanDTO> plans = planService.getPlansByUserId(userId);
        return ResponseEntity.ok(plans);
    }

    // Get public plans by user id
    @GetMapping("/user/{userId}/public")
    public ResponseEntity<List<PlanDTO>> getPublicPlansByUserId(@PathVariable String userId) {
        List<PlanDTO> plans = planService.getPublicPlansByUserId(userId);
        return ResponseEntity.ok(plans);
    }

    // Create new plan
    @PostMapping
    public ResponseEntity<PlanDTO> createPlan(@RequestBody CreatePlanDTO createPlanDTO) {
        PlanDTO createdPlan = planService.createPlan(createPlanDTO);
        if (createdPlan == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);
    }

    // Update plan
    @PutMapping("/{id}")
    public ResponseEntity<PlanDTO> updatePlan(@PathVariable String id, @RequestBody CreatePlanDTO updatePlanDTO) {
        PlanDTO updatedPlan = planService.updatePlan(id, updatePlanDTO);
        if (updatedPlan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedPlan);
    }

    // Delete plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable String id) {
        boolean deleted = planService.deletePlan(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    // Search plans by title
    @GetMapping("/search")
    public ResponseEntity<List<PlanDTO>> searchPlansByTitle(@RequestParam String keyword) {
        List<PlanDTO> plans = planService.searchPlansByTitle(keyword);
        return ResponseEntity.ok(plans);
    }
}