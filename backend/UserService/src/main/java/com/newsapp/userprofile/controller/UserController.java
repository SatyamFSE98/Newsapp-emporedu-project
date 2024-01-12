package com.newsapp.userprofile.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newsapp.userprofile.entity.User;
import com.newsapp.userprofile.entity.UserResponse;
import com.newsapp.userprofile.repository.UserRepository;
import com.newsapp.userprofile.service.KafkaProducerConfig;

@RestController
@RequestMapping("/api/v1")
public class UserController {

	//@Autowired
	//private KafkaProducerConfig kafkaProducerConfig;

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/users")
	public String registerUser(@RequestBody User user) {
		User save = userRepository.save(user);

		UserResponse userResponse = new UserResponse();
		userResponse.setUsername(user.getUsername());
		userResponse.setPassword(user.getPassword());

		//kafkaProducerConfig.sendMessage(userResponse);

		return "User successfully registered!!";

	}

}
