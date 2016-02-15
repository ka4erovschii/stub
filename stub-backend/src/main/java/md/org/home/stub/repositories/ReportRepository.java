package md.org.home.stub.repositories;


import md.org.home.stub.entity.reports.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select r from Report r where r.code = :code")
    Report getReportByCode(@Param("code") String code);

    @Query("select r from Report r where r.module = :module")
    List<Report> getAllReportsByModule(@Param("module") String module);
}
