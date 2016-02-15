package md.org.home.stub.auth;

import md.org.home.stub.entity.User;

public class AuthResponse {

	private String username;
	private String usertype;
	private String raion;
	private String localitate;
	private String token;
	private boolean authenticated;


	public AuthResponse(User user) {
		this.token = user.getToken();
		this.username = user.getUserName();
		this.usertype = user.getUserType();
	}
    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getRaion() {
        return raion;
    }

    public void setRaion(String raion) {
        this.raion = raion;
    }

    public String getLocalitate() {
        return localitate;
    }

    public void setLocalitate(String localitate) {
        this.localitate = localitate;
    }

    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean isAuthenticated() {
		return authenticated;
	}

	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}

}
