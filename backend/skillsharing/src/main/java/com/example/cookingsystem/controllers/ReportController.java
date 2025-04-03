package com.example.cookingsystem.controllers;

import com.example.cookingsystem.dtos.ReportDTO;
import com.example.cookingsystem.models.Report;
import com.example.cookingsystem.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    // Report a post
    @PostMapping("/post/{postId}/{reporterId}")
    public ResponseEntity<ReportDTO> reportPost(
            @PathVariable String reporterId,
            @PathVariable String postId,
            @RequestParam String reason) {

        ReportDTO report = reportService.createPostReport(reporterId, postId, reason);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    // Report a comment
    @PostMapping("/comment/{commentId}/{reporterId}")
    public ResponseEntity<ReportDTO> reportComment(
            @PathVariable String reporterId,
            @PathVariable String commentId,
            @RequestParam String reason) {

        ReportDTO report = reportService.createCommentReport(reporterId, commentId, reason);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    // Get all reports
    @GetMapping
    public ResponseEntity<List<ReportDTO>> getAllReports() {
        List<ReportDTO> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    // Get reports by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ReportDTO>> getReportsByType(
            @PathVariable Report.ReportType type) {

        List<ReportDTO> reports = reportService.getReportsByType(type);
        return ResponseEntity.ok(reports);
    }

    // Get single report
    @GetMapping("/{reportId}")
    public ResponseEntity<ReportDTO> getReportById(
            @PathVariable String reportId) {

        ReportDTO report = reportService.getReportById(reportId);
        return ResponseEntity.ok(report);
    }

    // Delete report
    @DeleteMapping("/{reportId}")
    public ResponseEntity<Void> deleteReport(
            @PathVariable String reportId) {

        reportService.deleteReport(reportId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{reportId}/resolve")
    public ResponseEntity<ReportDTO> resolveReport(@PathVariable String reportId) {
        ReportDTO resolvedReport = reportService.markReportAsResolved(reportId);
        return ResponseEntity.ok(resolvedReport);
    }
}