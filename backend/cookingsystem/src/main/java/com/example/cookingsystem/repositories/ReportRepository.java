package com.example.cookingsystem.repositories;

import com.example.cookingsystem.models.Report;
import com.example.cookingsystem.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReportRepository extends MongoRepository<Report, String> {
    List<Report> findByReportType(Report.ReportType reportType);
    List<Report> findByContentOwner(User contentOwner);
    List<Report> findByReportedBy(User reportedBy);
}