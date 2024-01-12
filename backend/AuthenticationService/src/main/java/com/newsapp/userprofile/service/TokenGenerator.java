package com.newsapp.userprofile.service;

import java.util.Map;

import com.newsapp.userprofile.entity.UserCredential;

public interface TokenGenerator {
	Map<String, String> generateToken(UserCredential userCredential);
}
