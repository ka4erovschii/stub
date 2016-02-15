package md.org.home.stub.services;


import md.org.home.stub.config.ApplicationConfiguration;
import md.org.home.stub.services.impl.ReportServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;


@ContextConfiguration(classes = ApplicationConfiguration.class)
public class ReportGeneratorTest {


    @Autowired
    private ReportServiceImpl reportService;


}
