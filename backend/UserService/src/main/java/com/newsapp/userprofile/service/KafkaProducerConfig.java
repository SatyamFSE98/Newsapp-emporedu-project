package com.newsapp.userprofile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.newsapp.userprofile.entity.UserResponse;

@Service
public class KafkaProducerConfig {

	@Autowired
	private KafkaTemplate<String, UserResponse> kafkaTemplate;

	public void sendMessage(UserResponse userResponse) {
		kafkaTemplate.send("newTopic", userResponse);
	}

}
