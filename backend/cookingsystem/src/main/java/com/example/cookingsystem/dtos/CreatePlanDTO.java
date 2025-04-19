package com.example.cookingsystem.dtos;

import java.util.Date;
import java.util.List;

public class CreatePlanDTO {
    private String userId;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private List<PlanDTO.TopicDTO> topics;
    private boolean isPublic;

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<PlanDTO.TopicDTO> getTopics() {
        return topics;
    }

    public void setTopics(List<PlanDTO.TopicDTO> topics) {
        this.topics = topics;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }
}

// User summary DTO for owner information
