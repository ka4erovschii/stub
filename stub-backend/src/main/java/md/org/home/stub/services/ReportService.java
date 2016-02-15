package md.org.home.stub.services;

import md.org.home.stub.config.ReportFormat;

import java.util.Map;

public interface ReportService {
    byte[] generateReport(String reportFile) throws Exception;

    byte[] generateReport(String reportFile, ReportFormat format) throws Exception;

    byte[] generateReport(String reportFile, Map<String, Object> params) throws Exception;

    byte[] generateReport(String reportFile, ReportFormat format, Map<String, Object> params) throws Exception;

}

