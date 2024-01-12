package com.news.newsapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.news.newsapi.domain.News;

@Service
public class ApiServiceImpl implements ApiService {

	
	 String API_KEY="c37fc0e9163c44cdb008eb9eaf23e66d";

	@Override
	public News getNewsApi() {
		String url = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey="+API_KEY;
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForObject(url, News.class);

	}

	@Override
	public News getNewsSearchApi(String keyword) {

		//String url = "https://newsapi.org/v2/everything?q="+keyword+"&sortBy=publishedAt&pageSize=25&apiKey="+API_KEY;
		String url = UriComponentsBuilder.fromUriString("https://newsapi.org/v2/everything")
	            .queryParam("q", keyword)
	            .queryParam("sortBy", "publishedAt")
	            .queryParam("pageSize", "25")
	            .queryParam("apiKey", API_KEY)
	            .toUriString();
		
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForObject(url, News.class);
	}

}
