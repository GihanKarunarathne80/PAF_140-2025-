package com.example.skillsharing.repositories;

import com.example.skillsharing.models.Report;
import com.example.skillsharing.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReportRepository extends MongoRepository<Report, String> {
    List<Report> findByReportType(Report.ReportType reportType);
    List<Report> findByContentOwner(User contentOwner);
    List<Report> findByReportedBy(User reportedBy);
}