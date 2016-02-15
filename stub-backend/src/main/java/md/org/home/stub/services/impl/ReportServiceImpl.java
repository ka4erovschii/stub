package md.org.home.stub.services.impl;

import md.org.home.stub.config.ReportFormat;
import md.org.home.stub.services.ReportService;
import md.org.home.stub.config.ApplicationConfiguration;
import net.sf.jasperreports.crosstabs.JRCrosstab;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.util.JRElementsVisitor;
import net.sf.jasperreports.engine.util.JRProperties;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;

import javax.sql.DataSource;
import java.io.*;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@ContextConfiguration(classes = ApplicationConfiguration.class)
public class ReportServiceImpl implements ReportService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportServiceImpl.class);
    @Autowired
    private DataSource dataSource;


    @Autowired
    @Qualifier("reportsPath")
    private String reportsPath;


    public JasperReport compileReport(String reportFolder, String reportName) throws JRException {
        return compileReport(reportFolder, reportName, new ArrayList<String>());
    }

    public JasperReport compileReport(final String reportFolder, String reportName, final List<String> compiledReports) throws JRException {
        JRProperties.setProperty("net.sf.jasperreports.awt.ignore.missing.font", "true");
        JRProperties.setProperty("net.sf.jasperreports.default.font.name", "Arial");
        JasperDesign jasperDesign = JRXmlLoader.load(reportFolder + reportName + ".jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
        JRSaver.saveObject(jasperReport, reportFolder + reportName + ".jasper");


        LOGGER.info("Saving compiled report to: " + reportFolder + reportName + ".jasper");

        JRElementsVisitor.visitReport(jasperReport, new JRVisitor() {
            @Override
            public void visitBreak(JRBreak breakElement) {
            }

            @Override
            public void visitChart(JRChart chart) {
            }

            @Override
            public void visitCrosstab(JRCrosstab crosstab) {
            }

            @Override
            public void visitElementGroup(JRElementGroup elementGroup) {
            }

            @Override
            public void visitEllipse(JREllipse ellipse) {
            }

            @Override
            public void visitFrame(JRFrame frame) {
            }

            @Override
            public void visitImage(JRImage image) {
            }

            @Override
            public void visitLine(JRLine line) {
            }

            @Override
            public void visitRectangle(JRRectangle rectangle) {
            }

            @Override
            public void visitStaticText(JRStaticText staticText) {
            }

            @Override
            public void visitSubreport(JRSubreport subreport) {
                try {
                    String expression = subreport.getExpression().getText();
                    String subReportName = expression.substring(expression.indexOf("\"") + 1, expression.lastIndexOf("\"")).replace(".jasper", "");

                    if (compiledReports.contains(subReportName)) {
                        return;
                    }

                    compiledReports.add(subReportName);
                    compileReport(reportFolder, subReportName);
                } catch (Throwable e) {
                    System.err.print(e.getMessage());
                }
            }

            @Override
            public void visitTextField(JRTextField textField) {
            }

            @Override
            public void visitComponentElement(JRComponentElement componentElement) {
            }

            @Override
            public void visitGenericElement(JRGenericElement element) {
            }
        });
        return jasperReport;
    }

    @Override
    public byte[] generateReport(String reportFile) throws Exception {
        return generateReport(reportFile, ReportFormat.PDF, null);
    }

    @Override
    public byte[] generateReport(String reportFile, ReportFormat format) throws Exception {
        return generateReport(reportFile, format, null);
    }

    @Override
    public byte[] generateReport(String reportFile, Map<String, Object> params) throws Exception {
        return generateReport(reportFile, ReportFormat.PDF, params);
    }

    @Override
    public byte[] generateReport(String reportFile, ReportFormat format, Map<String, Object> params) throws Exception {
        System.out.println("*********** "+reportsPath);
        String reportCompiled = reportsPath + reportFile;
        if (reportCompiled.endsWith(".jrxml")) {
            reportCompiled = reportCompiled.substring(0, reportCompiled.length() - 6);
        }
        reportCompiled = reportCompiled + ".jasper";
        String reportFolder = reportCompiled.substring(0, reportCompiled.lastIndexOf('/') + 1);
        String reportName = reportCompiled.substring(reportCompiled.lastIndexOf("/") + 1).replace(".jasper", "");

        compileReport(reportFolder, reportName);

        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        final Connection connection = dataSource.getConnection();

        Map<String, Object> reportParams = new HashMap<>();
        if (params != null) {
            reportParams.putAll(params);
        }

        final InputStream input = new FileInputStream(reportCompiled);

        JasperRunManager.runReportToPdfStream(input, output, reportParams, connection);


        byte[] result = output.toByteArray();

        closeStreams(input, output);
        return result;
    }



    public byte[] generateReportTest(String reportFile, ReportFormat format) throws Exception {
        System.out.println("**********************************"+reportFile);
        String reportCompiled = reportsPath + reportFile;
        if (reportCompiled.endsWith(".jrxml")) {
            reportCompiled = reportCompiled.substring(0, reportCompiled.length() - 6);
        }
        reportCompiled = reportCompiled + ".jasper";
        String reportFolder = reportCompiled.substring(0, reportCompiled.lastIndexOf('/') + 1);
        String reportName = reportCompiled.substring(reportCompiled.lastIndexOf("/") + 1).replace(".jasper", "");

        compileReport(reportFolder, reportName);

        final ByteArrayOutputStream output = new ByteArrayOutputStream();

        Map<String, Object> reportParams = new HashMap<>();
        reportParams.put("SUBREPORT_DIR", reportFolder);

        final InputStream input = new FileInputStream(reportCompiled);
        JasperRunManager.runReportToPdfStream(input, output, reportParams);


        byte[] result = output.toByteArray();

        closeStreams(input, output);
        return result;
    }


    private void closeStreams(Closeable... streams) {
        for (Closeable stream : streams) {
            try {
                stream.close();
            } catch (IOException ignored) {
            }
        }
    }

}
