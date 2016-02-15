package md.org.home.stub.entity.reports;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "REPORTS")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "REPORTS_SEQ")
    @SequenceGenerator(name = "REPORTS_SEQ", sequenceName = "REPORTS_SEQ")
    @Column(name = "ID")
    private Long id;

    @Column(name = "REPORT_NAME")
    private String name;

    @Column(name = "REPORT_FILE")
    private String file;

    @Column(name = "RAION")
    private String raion;

    @Column(name = "PRIMARIE")
    private String primarie;

    @Column(name = "LOCALITATE")
    private String localitate;

    @Column(name = "MODULE")
    private String module;

    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private Set<ReportCriteria> criterias;

    @Column(name = "ROLES")
    private String roles;

    @Column(name = "CODE")
    private String code;

    public Report() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getRaion() {
        return raion;
    }

    public void setRaion(String raion) {
        this.raion = raion;
    }

    public String getPrimarie() {
        return primarie;
    }

    public void setPrimarie(String primarie) {
        this.primarie = primarie;
    }

    public String getLocalitate() {
        return localitate;
    }

    public void setLocalitate(String localitate) {
        this.localitate = localitate;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public Set<ReportCriteria> getCriterias() {
        return criterias;
    }

    public void setCriterias(Set<ReportCriteria> criterias) {
        this.criterias = criterias;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Report report = (Report) o;

        if (code != null ? !code.equals(report.code) : report.code != null) return false;
        if (file != null ? !file.equals(report.file) : report.file != null) return false;
        if (id != null ? !id.equals(report.id) : report.id != null) return false;
        if (localitate != null ? !localitate.equals(report.localitate) : report.localitate != null) return false;
        if (module != null ? !module.equals(report.module) : report.module != null) return false;
        if (name != null ? !name.equals(report.name) : report.name != null) return false;
        if (primarie != null ? !primarie.equals(report.primarie) : report.primarie != null) return false;
        if (raion != null ? !raion.equals(report.raion) : report.raion != null) return false;
        if (roles != null ? !roles.equals(report.roles) : report.roles != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (file != null ? file.hashCode() : 0);
        result = 31 * result + (raion != null ? raion.hashCode() : 0);
        result = 31 * result + (primarie != null ? primarie.hashCode() : 0);
        result = 31 * result + (localitate != null ? localitate.hashCode() : 0);
        result = 31 * result + (module != null ? module.hashCode() : 0);
        result = 31 * result + (roles != null ? roles.hashCode() : 0);
        result = 31 * result + (code != null ? code.hashCode() : 0);
        return result;
    }
}
