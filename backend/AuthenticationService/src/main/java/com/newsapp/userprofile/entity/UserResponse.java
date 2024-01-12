package com.newsapp.userprofile.entity;

public class UserResponse {

	private String username;
	private String password;

	public UserResponse(String username, String password) {
		this.username = username;
		this.password = password;
	}

	public UserResponse() {

	}

	@Override
	public String toString() {
		return "UserResponse [username=" + username + ", password=" + password + "]";
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
