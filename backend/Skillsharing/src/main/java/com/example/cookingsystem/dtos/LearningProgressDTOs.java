package com.example.cookingsystem.dtos;

import java.util.Date;

public class LearningProgressDTOs {

    public static class CreateLearningProgress {
        private String title;
        private String description;
        private boolean isArchived;
        private int satisfactionLevel;

        // Getters and Setters
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
    }

    public static class UpdateLearningProgress {
        private String id;
        private String title;
        private String description;
        private boolean isArchived;
        private int satisfactionLevel;

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
    }

    public static class GetLearningProgress {
        private String id;
        private String title;
        private String description;
        private boolean isArchived;
        private int satisfactionLevel;
        private Date createdAt;
        private Date updatedAt;
        private UserInfo user;

        // Static inner class for user info
        public static class UserInfo {
            private String id;
            private String name;

            public UserInfo(String id, String name) {
                this.id = id;
                this.name = name;
            }

            // Getters
            public String getId() {
                return id;
            }

            public String getName() {
                return name;
            }
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

        public UserInfo getUser() {
            return user;
        }

        public void setUser(UserInfo user) {
            this.user = user;
        }
    }
}