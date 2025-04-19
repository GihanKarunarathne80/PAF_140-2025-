package com.example.cookingsystem.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "plans")
public class Plan {
    @Id
    private String id;

    @DBRef
    private User user;

    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private List<Topic> topics;
    private boolean isPublic;

    // Nested class for topics
    public static class Topic {
        private String title;
        private String description;
        private List<Resource> resources;
        private Date deadlineDate;

        // Default constructor
        public Topic() {
        }

        // Constructor with parameters
        public Topic(String title, String description, List<Resource> resources, Date deadlineDate) {
            this.title = title;
            this.description = description;
            this.resources = resources;
            this.deadlineDate = deadlineDate;
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

        public List<Resource> getResources() {
            return resources;
        }

        public void setResources(List<Resource> resources) {
            this.resources = resources;
        }

        public Date getDeadlineDate() {
            return deadlineDate;
        }

        public void setDeadlineDate(Date deadlineDate) {
            this.deadlineDate = deadlineDate;
        }
    }

    // Nested class for resources
    public static class Resource {
        private String name;
        private String url;
        private String type; // book, video, article, etc.

        // Default constructor
        public Resource() {
        }

        // Constructor with parameters
        public Resource(String name, String url, String type) {
            this.name = name;
            this.url = url;
            this.type = type;
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

    // Default constructor
    public Plan() {
    }

    // Constructor with parameters
    public Plan(String id, User user, String title, String description, Date startDate, Date endDate,
                List<Topic> topics, boolean isPublic) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.topics = topics;
        this.isPublic = isPublic;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }
}