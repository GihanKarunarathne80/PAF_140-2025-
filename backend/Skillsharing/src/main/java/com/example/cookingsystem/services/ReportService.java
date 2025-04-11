package com.example.cookingsystem.services;

import com.example.cookingsystem.dtos.ReportDTO;
import com.example.cookingsystem.exceptions.ResourceNotFoundException;
import com.example.cookingsystem.models.*;
import com.example.cookingsystem.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserService userService;
    private final CookingPostService postService;
    private final CommentService commentService;

    @Autowired
    public ReportService(ReportRepository reportRepository,
                         UserService userService,
                         CookingPostService postService,
                         CommentService commentService) {
        this.reportRepository = reportRepository;
        this.userService = userService;
        this.postService = postService;
        this.commentService = commentService;
    }

    // Create report for a post
    public ReportDTO createPostReport(String reporterId, String postId, String reason) {
        Optional<User> reporter = userService.getUserById(reporterId);
        Optional<CookingPost> post = postService.getPostById(postId);

        Report report = new Report(reason, reporter.get(), post.get());
        Report savedReport = reportRepository.save(report);
        return convertToDTO(savedReport);
    }

    // Create report for a comment
    public ReportDTO createCommentReport(String reporterId, String commentId, String reason) {
        Optional<User> reporter = userService.getUserById(reporterId);
        Optional<Comment> comment = commentService.getCommentById(commentId);

        Report report = new Report(reason, reporter.get(), comment.get());
        Report savedReport = reportRepository.save(report);
        return convertToDTO(savedReport);
    }

    // Get all reports
    public List<ReportDTO> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get reports by type (POST or COMMENT)
    public List<ReportDTO> getReportsByType(Report.ReportType type) {
        return reportRepository.findByReportType(type)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get report by ID
    public ReportDTO getReportById(String reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));
        return convertToDTO(report);
    }

    // Delete report
    public void deleteReport(String reportId) {
        if (!reportRepository.existsById(reportId)) {
            throw new ResourceNotFoundException("Report not found with id: " + reportId);
        }
        reportRepository.deleteById(reportId);
    }
    public ReportDTO markReportAsResolved(String reportId) {
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + reportId));

        report.setResolved(true);
        Report updatedReport = reportRepository.save(report);

        return convertToDTO(updatedReport);
    }
    // Helper method to convert Report to DTO
    private ReportDTO convertToDTO(Report report) {
        ReportDTO dto = new ReportDTO();
        dto.setId(report.getId());
        dto.setReason(report.getReason());
        dto.setReportedAt(report.getReportedAt());
        dto.setReportType(report.getReportType());
        dto.setReportedContentId(report.getReportedContentId());
        dto.setResolved(report.isResolved());
        // Set reporter info
        User reporter = report.getReportedBy();
        dto.setReporterUserId(reporter.getId());
        dto.setReporterName(reporter.getName());
        dto.setReporterEmail(reporter.getEmail());

        // Set content owner info
        User contentOwner = report.getContentOwner();
        dto.setContentOwnerUserId(contentOwner.getId());
        dto.setContentOwnerName(contentOwner.getName());
        dto.setContentOwnerEmail(contentOwner.getEmail());

        // Set content preview based on type
        if (report.getReportType() == Report.ReportType.POST) {
            Optional<CookingPost> post = postService.getPostById(report.getReportedContentId());
            post.ifPresent(cookingPost -> dto.setContentPreview(cookingPost.getDescription().length() > 50
                    ? cookingPost.getDescription().substring(0, 50) + "..."
                    : cookingPost.getDescription()));
        } else {
            Optional<Comment> comment = commentService.getCommentById(report.getReportedContentId());
            comment.ifPresent(value -> dto.setContentPreview(value.getComment().length() > 50
                    ? value.getComment().substring(0, 50) + "..."
                    : value.getComment()));
        }

        return dto;
    }
}