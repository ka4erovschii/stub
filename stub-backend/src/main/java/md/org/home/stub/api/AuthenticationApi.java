package md.org.home.stub.api;


import md.org.home.stub.auth.AuthRequest;
import md.org.home.stub.auth.AuthResponse;
import md.org.home.stub.entity.User;
import md.org.home.stub.services.impl.UserServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.AuthenticationFailedException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Transactional
@Component
public class AuthenticationApi {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationApi.class);

    @Autowired
	private UserServiceImpl userService;

	@GET
	@Path("/logout/{username}")
	public Response logout(@PathParam("username") String username,  @HeaderParam("X-Authorization") String token, @Context HttpServletRequest request) throws AuthenticationFailedException {
        User user = userService.checkAuthentication(username, token, request);
        user.setToken(null);
		return Response.ok().build();
	}

    @GET
    @Path("/user")
    public Response users(@HeaderParam("X-Authorization") String token, @Context HttpServletRequest request) throws AuthenticationFailedException {
        User user = userService.getUser("admin");
        return Response.ok(user).build();
    }

    @POST
    @Path("/login")
    public AuthResponse login(AuthRequest request,@Context HttpServletRequest servletRequest) throws AuthenticationFailedException {

        LOGGER.info("Authenticating user {} from IP {}", request.getUsername(), servletRequest.getRemoteAddr());
        if (StringUtils.isBlank(request.getUsername()) || StringUtils.isBlank(request.getPassword())) {
            throw new AuthenticationFailedException("Invalid username or password");
        }

        System.out.println(request.getUsername() + " " + request.getPassword());
        return  new AuthResponse(userService.authenticate(request,servletRequest));
    }
}