package com.newsapp.userprofile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newsapp.userprofile.entity.UserCredential;
import com.newsapp.userprofile.exception.UserNotFoundException;
import com.newsapp.userprofile.repository.UserCredentialRepository;

@Service
public class UserCredentialServiceImpl implements UserCredentialService {

	@Autowired
	private UserCredentialRepository userCredentialRepository;

	@Override
	public UserCredential getByUserNameAndPassword(String username, String password) throws UserNotFoundException {
		UserCredential userCredential = userCredentialRepository.findByUsernameAndPassword(username, password);
		if (userCredential == null) {
			throw new UserNotFoundException();
		}

		return userCredential;
	}

}
