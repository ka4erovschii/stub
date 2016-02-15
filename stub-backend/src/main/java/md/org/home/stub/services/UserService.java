package md.org.home.stub.services;

import md.org.home.stub.auth.AuthRequest;
import md.org.home.stub.entity.User;

import javax.mail.AuthenticationFailedException;
import javax.servlet.http.HttpServletRequest;

public interface UserService {
	 boolean checkPassword(String username, String password);
	 User authenticate(AuthRequest request,HttpServletRequest servletRequest) throws AuthenticationFailedException;
	 User checkAuthentication(String username, String token, HttpServletRequest servletRequest) throws AuthenticationFailedException;
	 User getAuthenticatedUser(String token);
     User findUserByNameAndPassword(String username, String password);
     User getUser(String username);
	 void setPassword(String username, String password);
}
