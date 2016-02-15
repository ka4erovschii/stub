package md.org.home.stub.repositories;

import md.org.home.stub.entity.reports.ReportCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

@Deprecated
public interface ReportCriteriaRepository extends JpaRepository<ReportCriteria, Long> {

}
