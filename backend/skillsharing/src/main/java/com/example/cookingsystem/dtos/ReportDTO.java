package com.example.cookingsystem.dtos;

import com.example.cookingsystem.models.Report;
import java.util.Date;

public class ReportDTO {
    private String id;
    private String reason;
    private Date reportedAt;
    private Report.ReportType reportType;
    private boolean resolved;

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }
    // Reporter info
    private String reporterUserId;
    private String reporterName;
    private String reporterEmail;

    // Content owner info
    private String contentOwnerUserId;
    private String contentOwnerName;
    private String contentOwnerEmail;

    // Reported content info
    private String reportedContentId;
    private String contentPreview; // First 50 chars of post/comment

    // Constructors, getters, and setters
    public ReportDTO() {}

    // Getters and setters for all fields
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

    public Report.ReportType getReportType() {
        return reportType;
    }

    public void setReportType(Report.ReportType reportType) {
        this.reportType = reportType;
    }

    public String getReporterUserId() {
        return reporterUserId;
    }

    public void setReporterUserId(String reporterUserId) {
        this.reporterUserId = reporterUserId;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getReporterEmail() {
        return reporterEmail;
    }

    public void setReporterEmail(String reporterEmail) {
        this.reporterEmail = reporterEmail;
    }

    public String getContentOwnerUserId() {
        return contentOwnerUserId;
    }

    public void setContentOwnerUserId(String contentOwnerUserId) {
        this.contentOwnerUserId = contentOwnerUserId;
    }

    public String getContentOwnerName() {
        return contentOwnerName;
    }

    public void setContentOwnerName(String contentOwnerName) {
        this.contentOwnerName = contentOwnerName;
    }

    public String getContentOwnerEmail() {
        return contentOwnerEmail;
    }

    public void setContentOwnerEmail(String contentOwnerEmail) {
        this.contentOwnerEmail = contentOwnerEmail;
    }

    public String getReportedContentId() {
        return reportedContentId;
    }

    public void setReportedContentId(String reportedContentId) {
        this.reportedContentId = reportedContentId;
    }

    public String getContentPreview() {
        return contentPreview;
    }

    public void setContentPreview(String contentPreview) {
        this.contentPreview = contentPreview;
    }
}