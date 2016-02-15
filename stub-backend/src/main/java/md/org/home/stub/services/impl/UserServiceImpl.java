package md.org.home.stub.services.impl;

import md.org.home.stub.auth.AuthRequest;
import md.org.home.stub.config.ApplicationConfiguration;
import md.org.home.stub.entity.User;
import md.org.home.stub.repositories.UserRepository;
import md.org.home.stub.services.UserService;
import md.org.home.stub.util.BusinessUtils;
import md.org.home.stub.util.PasswordUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.annotation.Resource;
import javax.mail.AuthenticationFailedException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.UUID;

@ContextConfiguration(classes = ApplicationConfiguration.class)
@Service
public class UserServiceImpl implements UserService {


    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
	@Resource
	private UserRepository userRepository;

    @Override
    public boolean checkPassword(String username, String password) {
        User user = userRepository.findByUserName(username);
        return (user != null)  && PasswordUtility.check(password, user.getPassword());
    }

    @Override
	public User authenticate(AuthRequest request,HttpServletRequest servletRequest) throws AuthenticationFailedException {

        if (!checkPassword(request.getUsername(), request.getPassword())) {
            log.error("Login failed for provided username: {}", request.getUsername());
            // TODO disable user after n failed attempts
            throw new AuthenticationFailedException("User authentication failed");
        }

        try {
            byte[] bytes = new BASE64Decoder().decodeBuffer(request.getUsername());
            String u = new BASE64Encoder().encode(bytes);
            System.out.println(u);

        } catch (IOException e) {
            e.printStackTrace();
        }

		//User user = userRepository.findByUserNameAndPassword(request.getUsername(),request.getPassword());
		User user = userRepository.findByUserName(request.getUsername());
        user.setToken(UUID.randomUUID().toString());
        System.out.println("authenticate findByUserName is "+user.getUserName());

		return user;
	}

    @Override
	public User checkAuthentication(String username, String token, HttpServletRequest servletRequest) throws AuthenticationFailedException {
        log.trace("Checking authentication for user: {}", username);
        if (token == null) {
            log.error("Null token provided for authentication! Username: {}", username);
            throw new AuthenticationFailedException("Null token provided for authentication");
        }
        if (servletRequest == null) {
            log.error("Servlet request is null! Unable to perform authentication for username: {} !", username);
            throw new IllegalArgumentException("WTF is going on. How is this possible?");
        }
        log.trace("Authenticating username={}, ip={} ...", username, servletRequest.getRemoteAddr());

        return userRepository.findByUserName(username);
	}

    @Override
	public User getAuthenticatedUser(String username) {
        return getUser(username);
	}


    @Override
    public User findUserByNameAndPassword(String username, String password) {
        return BusinessUtils.returnOrDataNotFound(userRepository.findByUserNameAndPassword(username, password));
    }

    @Override
    public User getUser(String username) {
        return BusinessUtils.returnOrDataNotFound(userRepository.findByUserName(username));
    }

    @Override
    public void setPassword(String username, String password) {
        User user = userRepository.findByUserName(username);
        user.setPassword(PasswordUtility.encode(password));
        userRepository.save(user);
    }
}
