package md.org.home.stub.entity.reports;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "REPORT_CRITERIAS")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "REPORT_CRITERIAS_SEQ")
    @SequenceGenerator(name = "REPORT_CRITERIAS_SEQ", sequenceName = "REPORT_CRITERIAS_SEQ")
    @Column(name = "ID")
    private Long id;

    @Column(name = "LABEL")
    private String label;

    @Column(name = "CRITERIA_NAME")
    private String name;

    @Column(name = "CRITERIA_TYPE")
    @Enumerated(EnumType.STRING)
    private CriteriaType type;

    @Column(name = "REQUIRED")
    @Type(type = "yes_no")
    private Boolean required;

    @Column(name = "POSITION")
    private Long position;

    @ManyToOne
    @JoinColumn(name = "REPORT_ID")
    @JsonIgnore
    private Report report;

    public ReportCriteria() {
    }

    public ReportCriteria(String label, String name, CriteriaType type, Boolean required, Long position) {
        this.label = label;
        this.name = name;
        this.type = type;
        this.required = required;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CriteriaType getType() {
        return type;
    }

    public void setType(CriteriaType type) {
        this.type = type;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ReportCriteria that = (ReportCriteria) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (label != null ? !label.equals(that.label) : that.label != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (position != null ? !position.equals(that.position) : that.position != null) return false;
        if (required != null ? !required.equals(that.required) : that.required != null) return false;
        if (type != that.type) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (label != null ? label.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (required != null ? required.hashCode() : 0);
        result = 31 * result + (position != null ? position.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ReportCriteria{" +
                "id=" + id +
                ", label='" + label + '\'' +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", required=" + required +
                ", position=" + position +
                ", report=" + report +
                '}';
    }
}
