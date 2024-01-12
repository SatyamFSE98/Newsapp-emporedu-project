package com.newsapp.userprofile.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.newsapp.userprofile.entity.UserCredential;
import com.newsapp.userprofile.entity.UserResponse;
import com.newsapp.userprofile.repository.UserCredentialRepository;

@Service
public class KafkaConsumerConfig {

	private static final Logger logger = LoggerFactory.getLogger(KafkaConsumerConfig.class);

	@Autowired
	private UserCredentialRepository userCredentialRepository;

	@KafkaListener(topics = "newTopic", groupId = "authGroup")
	public void consume(UserResponse userResponse) {
		logger.info(String.format("Consumer consume:-> %s", userResponse.toString()));

		UserCredential userCredential = new UserCredential();
		userCredential.setUsername(userResponse.getUsername());
		userCredential.setPassword(userResponse.getPassword());

		UserCredential save = userCredentialRepository.save(userCredential);

		logger.info(String.format("User credential:-> %s", save.toString()));
	}

}
