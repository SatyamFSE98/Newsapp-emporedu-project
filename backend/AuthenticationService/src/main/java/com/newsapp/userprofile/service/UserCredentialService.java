package com.newsapp.userprofile.service;

import com.newsapp.userprofile.entity.UserCredential;
import com.newsapp.userprofile.exception.UserNotFoundException;

public interface UserCredentialService {

	
	public UserCredential getByUserNameAndPassword(String username, String password) throws UserNotFoundException;
}


