package com.newsapp.userprofile.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.newsapp.userprofile.entity.UserCredential;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtSecurityTokenGeneratorImpl implements TokenGenerator {

	@Override
	public Map<String, String> generateToken(UserCredential userCredential) {

		String jwtToken = null;
		jwtToken = Jwts.builder().setSubject(userCredential.getUsername()).setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		Map<String, String> map = new HashMap<>();
		map.put("token", jwtToken);
		map.put("message", "User Successfully logged in");
		return map;
	}

}
