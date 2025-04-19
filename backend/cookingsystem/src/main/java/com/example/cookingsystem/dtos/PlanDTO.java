package com.example.cookingsystem.dtos;

import com.example.cookingsystem.models.Plan;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class PlanDTO {
    private String id;
    private UserSummaryDTO owner;
    private String title;
    private String description;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date endDate;

    private List<TopicDTO> topics;
    private boolean isPublic;

    // Default constructor
    public PlanDTO() {
    }

    // Constructor from Plan entity
    public PlanDTO(Plan plan) {
        this.id = plan.getId();
        this.owner = new UserSummaryDTO(plan.getUser().getId(), plan.getUser().getName(),
                plan.getUser().getProfileImage());
        this.title = plan.getTitle();
        this.description = plan.getDescription();
        this.startDate = plan.getStartDate();
        this.endDate = plan.getEndDate();
        this.isPublic = plan.isPublic();

        if (plan.getTopics() != null) {
            this.topics = plan.getTopics().stream()
                    .map(TopicDTO::new)
                    .collect(Collectors.toList());
        }
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserSummaryDTO getOwner() {
        return owner;
    }

    public void setOwner(UserSummaryDTO owner) {
        this.owner = owner;
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

    public List<TopicDTO> getTopics() {
        return topics;
    }

    public void setTopics(List<TopicDTO> topics) {
        this.topics = topics;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }

    // Nested TopicDTO
    public static class TopicDTO {
        private String title;
        private String description;
        private List<ResourceDTO> resources;

        @JsonFormat(pattern="yyyy-MM-dd")
        private Date deadlineDate;

        public TopicDTO() {
        }

        public TopicDTO(Plan.Topic topic) {
            this.title = topic.getTitle();
            this.description = topic.getDescription();
            this.deadlineDate = topic.getDeadlineDate();

            if (topic.getResources() != null) {
                this.resources = topic.getResources().stream()
                        .map(ResourceDTO::new)
                        .collect(Collectors.toList());
            }
        }

        // Getters and setters
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

        public List<ResourceDTO> getResources() {
            return resources;
        }

        public void setResources(List<ResourceDTO> resources) {
            this.resources = resources;
        }

        public Date getDeadlineDate() {
            return deadlineDate;
        }

        public void setDeadlineDate(Date deadlineDate) {
            this.deadlineDate = deadlineDate;
        }
    }

    // Nested ResourceDTO
    public static class ResourceDTO {
        private String name;
        private String url;
        private String type;

        public ResourceDTO() {
        }

        public ResourceDTO(Plan.Resource resource) {
            this.name = resource.getName();
            this.url = resource.getUrl();
            this.type = resource.getType();
        }

        // Getters and setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }
}

// Create a DTO to handle plan creation
