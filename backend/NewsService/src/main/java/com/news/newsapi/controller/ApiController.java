package com.news.newsapi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.news.newsapi.domain.News;
import com.news.newsapi.exception.InvalidCredentialException;
import com.news.newsapi.feign.AuthClient;
import com.news.newsapi.service.ApiServiceImpl;

import feign.FeignException;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "http://localhost:4200")

public class ApiController {
	private final ApiServiceImpl apiServiceImpl;
	private final AuthClient authClient;

	@Autowired
	public ApiController(ApiServiceImpl apiserviceImpl, AuthClient authClient) {
		this.apiServiceImpl = apiserviceImpl;
		this.authClient = authClient;
	}

	@GetMapping("/news")
	public News getNews() throws Exception {
		try {
			{

				return this.apiServiceImpl.getNewsApi();
			}

		} catch (FeignException e) {
			throw new Exception(e.getMessage());
		}
	}

	@GetMapping
	public News getNewsByCountry(@RequestParam("q") String keyword) throws Exception {
	    try {
	        return this.apiServiceImpl.getNewsSearchApi(keyword);
	    } catch (FeignException e) {
	        throw new Exception(e.getMessage());
	    }
	}

}
