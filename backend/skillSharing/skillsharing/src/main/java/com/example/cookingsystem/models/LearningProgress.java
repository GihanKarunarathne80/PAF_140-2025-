package com.example.skillsharing.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "learning_progresses")
public class LearningProgress {
    @Id
    private String id;
    private String title;
    private String description;
    private boolean isArchived;
    private int satisfactionLevel; // Could be 1-5 scale
    private Date createdAt;
    private Date updatedAt;

    @DBRef(lazy = true)
    private User user;

    // Constructors
    public LearningProgress() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public LearningProgress(String title, String description, boolean isArchived,
                            int satisfactionLevel, User user) {
        this();
        this.title = title;
        this.description = description;
        this.isArchived = isArchived;
        this.satisfactionLevel = satisfactionLevel;
        this.user = user;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean archived) {
        isArchived = archived;
    }

    public int getSatisfactionLevel() {
        return satisfactionLevel;
    }

    public void setSatisfactionLevel(int satisfactionLevel) {
        this.satisfactionLevel = satisfactionLevel;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}