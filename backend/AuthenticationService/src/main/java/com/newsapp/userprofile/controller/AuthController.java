package com.newsapp.userprofile.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newsapp.userprofile.entity.UserCredential;
import com.newsapp.userprofile.entity.UserResponse;
import com.newsapp.userprofile.exception.UserNotFoundException;
import com.newsapp.userprofile.service.TokenGenerator;
import com.newsapp.userprofile.service.UserCredentialService;

@RestController
//@RequestMapping("/api/v1")
public class AuthController {

	private ResponseEntity responseEntity;

	@Autowired
	private TokenGenerator tokenGenerator;

	@Autowired
	private UserCredentialService userCredentialService;

	@PostMapping("/login")
	public ResponseEntity loginuser(@RequestBody UserResponse userResponse) {

		Map<String, String> map = null;
		try {
			UserCredential userCredential = userCredentialService.getByUserNameAndPassword(userResponse.getUsername(),
					userResponse.getPassword());
			if (userCredential.getUsername().equals(userResponse.getUsername())) {
				map = tokenGenerator.generateToken(userCredential);
			}

			responseEntity = new ResponseEntity(map, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			responseEntity = new ResponseEntity("Something wrong happened!!", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return responseEntity;

	}

}
