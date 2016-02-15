package md.org.home.stub.api;

import net.sf.jasperreports.crosstabs.JRCrosstab;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.util.JRElementsVisitor;
import net.sf.jasperreports.engine.util.JRProperties;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

import javax.sql.DataSource;
import java.io.*;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by apple on 17.03.15.
 */
public  class ReportGenerator {

    public  static class People{
        public String name = "Name";
        public int year = 20;
        public void sayHello(){
            System.out.println("I am peaple");
        }
    }

    public static void foo(int a){
        a = a+5;
        System.out.println(a);

    }
    public static void change(String x) {
        x = "cd";
        System.out.println(x);
    }

    public static void changPeaple(People x) {
        x.name = "Other NAme";
        System.out.println(x.name);
    }

    public static DataSource dataSource;

/*
    public static void main(String[] args) throws JRException, IOException, SQLException, ParserConfigurationException, SAXException {
            int x = 10;
            System.out.println(x);
            foo(x);
            System.out.println(x);
            System.out.println("******************************************************");

            String x1 = new String("ab");
            System.out.println(x1);
            change(x1);
            System.out.println(x1);
            System.out.println("******************************************************");

            People p = new People();
            System.out.println(p.name);
            changPeaple(p);
            System.out.println(p.name);
        System.out.println("******************************************************");

        String a = "aa";
        String a1 = new String("bb");
        String b = "aa";
        String b1 = new String("bb");


        System.out.println(a.equals(b));
        System.out.println(a1.equals(b1));

        System.out.println(a == b);
        System.out.println(a1 == b1);



        */
/*File fileName = new File("/Users/apple/Desktop/Test.xlsx");
        createWorkbook(fileName);*//*


     */
/*   String ext = "<prestator><addres>str.Miorita 2/3</addres><country>Moldova</country><phone>022556677</phone><route>microbusul 131</route></prestator>";
        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
        InputSource src = new InputSource();
        src.setCharacterStream(new StringReader(ext));
        org.w3c.dom.Document doc = builder.parse(src);
        System.out.println(doc.getElementsByTagName("addres").item(0).getTextContent());*//*

    }
*/

    private static void closeStreams(Closeable... streams) {
        for (Closeable stream : streams) {
            try {
                stream.close();
            } catch (IOException ignored) {
            }
        }
    }

    public  ReportGenerator() throws JRException, SQLException, IOException {
        System.out.println("********************************** Start test");
        String reportCompiled= "/Users/apple/Projects/stub/stub-reports/tickets/victoria";

        System.out.println("**********************************"+reportCompiled);

        reportCompiled = reportCompiled + ".jasper";
        String reportFolder = reportCompiled.substring(0, reportCompiled.lastIndexOf('/') + 1);
        String reportName = reportCompiled.substring(reportCompiled.lastIndexOf("/") + 1).replace(".jasper", "");

        System.out.println(reportCompiled+" - "+reportFolder+" "+reportName);
        compileReport(reportFolder, reportName);

        final ByteArrayOutputStream output = new ByteArrayOutputStream();
        final Connection connection = dataSource.getConnection("root", "");


        Map<String, Object> reportParams = new HashMap<>();
        reportParams.put("SUBREPORT_DIR", reportFolder);

        final InputStream input = new FileInputStream(reportCompiled);
        JasperRunManager.runReportToPdfStream(input, output, reportParams,connection);


        byte[] result = output.toByteArray();
        System.out.println("byte length - "+result.length);

        FileOutputStream fos = new FileOutputStream("/Users/apple/Desktop/victoria.pdf");
        fos.write(result);
        fos.close();

        closeStreams(input, output);

        System.out.println("********************************** End test");
    }


    public static JasperReport compileReport(String reportFolder, String reportName) throws JRException {
        return compileReport(reportFolder, reportName, new ArrayList<String>());
    }

    public static JasperReport compileReport(final String reportFolder, String reportName, final List<String> compiledReports) throws JRException {
        JRProperties.setProperty("net.sf.jasperreports.awt.ignore.missing.font", "true");
        JRProperties.setProperty("net.sf.jasperreports.default.font.name", "Arial");

        System.out.println(reportFolder + reportName + ".jrxml");

        JasperDesign jasperDesign = JRXmlLoader.load(reportFolder + reportName + ".jrxml");

        System.out.println("JasperDesign loaded!");
        JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);

        JRSaver.saveObject(jasperReport, reportFolder + reportName + ".jasper");


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



    /*public static void createWorkbook(File fileName) throws IOException {
        try {
            FileOutputStream fos = new FileOutputStream(fileName);
            XSSFWorkbook workbook = new XSSFWorkbook();

            XSSFSheet sheet = workbook.createSheet("Victoria");

            Integer numPlace = 0;
            Integer nrFrom = 1;
            Integer cntDay = 19;


            DateTimeFormatter format = DateTimeFormat.forPattern("dd-MM-yyyy");
            DateTime time = format.parseDateTime("01-01-2015");


            DateTime dt = new DateTime(time);

            //for for month 1
            for(int i = 0; i<31; i++){
                if((i != 11) && (i != 12)) {
                    Row row = sheet.createRow(i);
                    if (nrFrom <= 119) {
                        numPlace = 12;
                    } else if (nrFrom > 119 && nrFrom < 236) {
                        numPlace = 13;
                    } else {
                        numPlace = 14;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }
            }


            //for for month 2
            for(int i = 31; i<59; i++){
                if((i != 31) && (i != 32) && (i != 52) && (i != 53)) {
                    Row row = sheet.createRow(i);
                    if (nrFrom >= 377 && nrFrom < 493) {
                        numPlace = 13;
                    } else if (nrFrom >= 634 && nrFrom < 698){
                        numPlace = 13;
                    } else {
                        numPlace = 14;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }

            //for for month 3
            for(int i = 59; i<90; i++){
                if((i != 74)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 699 && nrFrom <= 751) || (nrFrom > 905 && nrFrom <= 918)) {
                        numPlace = 13;
                    } else if ((nrFrom > 751 && nrFrom <= 905) || (nrFrom > 1022 && nrFrom<=1106)) {
                        numPlace = 14;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 4
            for(int i = 90; i<120; i++){
                if((i != 94 && i != 95 && i != 115 && i != 116)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 1106 && nrFrom <= 1162) || (nrFrom > 1279 && nrFrom <= 1419)) {
                        numPlace = 14;
                    } else if ((nrFrom > 1162 && nrFrom <= 1279) || (nrFrom > 1419 && nrFrom <= 1458)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 5
            for(int i = 120; i<151; i++){
                if((i != 136)&&(i != 137)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 1627 && nrFrom <= 1669) ) {
                        numPlace = 14;
                    } else if ((nrFrom > 1458 && nrFrom <= 1627) || (nrFrom > 1669 && nrFrom <= 1838)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }

            //for for month 6
            for(int i = 151; i<180; i++){
                if((i != 178)&&(i != 179)&&(i != 157)&&(i != 158)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 2127 && nrFrom <= 2169) || (nrFrom > 1877 && nrFrom <= 1919)) {
                        numPlace = 14;
                    } else if ((nrFrom > 1825 && nrFrom <= 1877) || (nrFrom > 1919 && nrFrom <= 2127) || (nrFrom >2169)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 7
            for(int i = 180; i<212; i++){
                if((i != 199)&&(i != 200)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 2627 && nrFrom <= 2669) || (nrFrom > 2377 && nrFrom <= 2419)) {
                        numPlace = 14;
                    } else if ((nrFrom > 2169 && nrFrom <= 2377) || (nrFrom > 2419 && nrFrom <= 2627)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 8
            for(int i = 212; i<241; i++){
                if((i != 220)&&(i != 221)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 2627 && nrFrom <= 2669) || (nrFrom > 2877 && nrFrom <= 2919)) {
                        numPlace = 14;
                    } else if ((nrFrom > 2562 && nrFrom <= 2627) || (nrFrom > 2669 && nrFrom <= 2877)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 9
            for(int i = 241; i<273; i++){
                if((i != 241)&&(i != 242)&&(i != 262)&&(i != 263)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 3127 && nrFrom <= 3141) || (nrFrom > 2877 && nrFrom <= 2919)) {
                        numPlace = 14;
                    } else if ((nrFrom > 2919 && nrFrom <= 3127) || (nrFrom > 3169 && nrFrom <= 3286)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }

            //for for month 10
            for(int i = 273; i<304; i++){
                if((i != 283)&&(i != 284)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 3377 && nrFrom <= 3391) || (nrFrom > 3627 && nrFrom <= 3669)) {
                        numPlace = 14;
                    } else if ((nrFrom > 3286 && nrFrom <= 3377) || (nrFrom > 3419 && nrFrom <= 3627)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 11
            for(int i = 304; i<334; i++){
                if((i != 304)&&(i != 305)&&(i != 325)&&(i != 326)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 3877 && nrFrom <= 3919)) {
                        numPlace = 14;
                    } else if ((nrFrom > 3669 && nrFrom <= 3877) || (nrFrom > 3919 && nrFrom <= 4010)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }


            //for for month 12
            for(int i = 334; i<365; i++){
                if((i != 346)&&(i != 347)) {
                    Row row = sheet.createRow(i);
                    if ((nrFrom > 4101 && nrFrom <= 4171) || (nrFrom > 4353 && nrFrom <= 4395)) {
                        numPlace = 14;
                    } else if ((nrFrom > 4010 && nrFrom <= 4101) || (nrFrom > 4171 && nrFrom <= 4353)) {
                        numPlace = 13;
                    }


                    Cell cell0 = row.createCell(0);
                    cell0.setCellValue(nrFrom);

                    Cell cell4 = row.createCell(4);
                    cell4.setCellValue(numPlace);

                    Cell cell1 = row.createCell(1);
                    nrFrom += (numPlace - 1);
                    cell1.setCellValue(nrFrom);

                    Cell cell2 = row.createCell(2);
                    cell2.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt));


                    dt = dt.plusDays(1);
                    Cell cell3 = row.createCell(3);
                    cell3.setCellValue(DateTimeFormat.forPattern("dd.MM.yyyy").print(dt.plusDays(cntDay)));
                    nrFrom++;
                }else{
                    dt = dt.plusDays(1);
                }

            }

            workbook.write(fos);
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }*/

}
