package md.org.home.stub.exception;

import org.springframework.http.HttpStatus;

import javax.annotation.Resource;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * Maps {@link UnauthenticatedException} to Http Status 401
 */
@Provider
@Resource
public class UnauthenticatedExceptionMapper implements
		ExceptionMapper<UnauthenticatedException> {

	/**
	 * Maps UnauthenticatedException to 401 http status code.
	 * 
	 * @see javax.ws.rs.ext.ExceptionMapper#toResponse(Throwable)
	 */
	@Override
	public Response toResponse(UnauthenticatedException exception) {
		return Response.status(HttpStatus.UNAUTHORIZED.value()).build();
	}

}
