package com.example.cookingsystem.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "reports")
public class Report {
    @Id
    private String id;
    private String reason;
    private Date reportedAt;
    private ReportType reportType; // POST or COMMENT

    // The user who created the report
    @DBRef(lazy = true)
    private User reportedBy;

    // The reported content (either a post or comment)
    private String reportedContentId; // Stores either postId or commentId
    private boolean resolved;

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }
    // The owner of the reported content (post owner or comment owner)
    @DBRef(lazy = true)
    private User contentOwner;

    // Enum for report type
    public enum ReportType {
        POST,
        COMMENT
    }

    // Default constructor
    public Report() {
        this.reportedAt = new Date();
    }

    // Constructor for post report
    public Report(String reason, User reportedBy, CookingPost post) {
        this();
        this.reason = reason;
        this.reportedBy = reportedBy;
        this.reportType = ReportType.POST;
        this.reportedContentId = post.getId();
        this.contentOwner = post.getCreatedBy();
    }

    // Constructor for comment report
    public Report(String reason, User reportedBy, Comment comment) {
        this();
        this.reason = reason;
        this.reportedBy = reportedBy;
        this.reportType = ReportType.COMMENT;
        this.reportedContentId = comment.getId();
        this.contentOwner = comment.getCommentedBy();
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Date getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(Date reportedAt) {
        this.reportedAt = reportedAt;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public User getReportedBy() {
        return reportedBy;
    }

    public void setReportedBy(User reportedBy) {
        this.reportedBy = reportedBy;
    }

    public String getReportedContentId() {
        return reportedContentId;
    }

    public void setReportedContentId(String reportedContentId) {
        this.reportedContentId = reportedContentId;
    }

    public User getContentOwner() {
        return contentOwner;
    }

    public void setContentOwner(User contentOwner) {
        this.contentOwner = contentOwner;
    }
}