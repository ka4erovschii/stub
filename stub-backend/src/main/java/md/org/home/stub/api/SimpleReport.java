package md.org.home.stub.api;


import md.org.home.stub.config.ReportFormat;
import md.org.home.stub.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;


@Path("/reports")
@Component
public class SimpleReport {

    @Autowired
    private ReportService reportService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() throws Exception {
        System.out.println("Start");

            Map<String, Object> reportParams = new HashMap<>();
            reportParams.put("SUBREPORT_DIR", "/Users/apple/Desktop/");
            reportParams.put("id", "727");



            byte[] result = reportService.generateReport("TesthelloJasper", ReportFormat.PDF, reportParams);
            System.out.println("byte length - "+result.length);

            FileOutputStream fos = new FileOutputStream("/Users/apple/Desktop/TesthelloJasper.pdf");
            fos.write(result);
            fos.close();

        return Response.ok().build();
    }


   /* @GET
    @Path("/generate/ticket/{applicationP}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response generateTicket(@PathParam("applicationP") String applicationP) throws Exception {

        Application application = applicationServices.getApplicationById(Long.parseLong(applicationP));

        Map<String, Object> reportParams = new HashMap<>();
        reportParams.put("APPLICATION", application);


        //get name of prestator
        String docName = taxonomyService.findDiscriminatorByCode("prestator",application.getSpecificatii().getValue()).get(0).getNameRo().toLowerCase();

        //byte[] result = reportService.generateReport("tickets/"+application.getTicket().getPrestator().getNameRo().toLowerCase(), ReportFormat.PDF, reportParams);
        byte[] result = reportService.generateReport("tickets/ticket", ReportFormat.PDF, reportParams);
        System.out.println("byte length - "+result.length);


        Document document = new Document();
        application.getTicket().setStatus(TicketStatus.CONFIRMED.toString());
        document.setApplication(application);
        document.setDocument(result);
        document.setDocumentName(docName + ".pdf");
        document.setSize((result.length)+"");


        applicationServices.updateApplication(application.getId(), application);
        documentServices.uploadDocument(document);

        //FileOutputStream fos = new FileOutputStream("/Users/apple/Desktop/"+docName+".pdf");
        //fos.write(result);
        //fos.close();

        return Response.ok().build();
    }

*/

}