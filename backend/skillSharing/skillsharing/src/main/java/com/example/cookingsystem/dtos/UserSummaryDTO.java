package com.example.skillsharing.dtos;

public class UserSummaryDTO {
    private String id;
    private String name;
    private String profileImage;

    public UserSummaryDTO() {
    }

    public UserSummaryDTO(String id, String name, String profileImage) {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}