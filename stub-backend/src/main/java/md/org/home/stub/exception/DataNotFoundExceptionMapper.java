package md.org.home.stub.exception;

/**
 * Created by apple on 24.02.15.
 */
import org.springframework.http.HttpStatus;

import javax.annotation.Resource;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Maps {@link DataNotFoundException} to Http Status 404
 */
@Provider
@Resource
public class DataNotFoundExceptionMapper implements ExceptionMapper<DataNotFoundException> {

    /**
     * Maps DataNotFoundException to 404 http status code.
     *
     * @see javax.ws.rs.ext.ExceptionMapper#toResponse(Throwable)
     */
    @Override
    public Response toResponse(DataNotFoundException exception) {
        return Response.status(HttpStatus.NOT_FOUND.value()).build();
    }

}