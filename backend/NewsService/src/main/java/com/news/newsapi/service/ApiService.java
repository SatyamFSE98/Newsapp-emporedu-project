package com.news.newsapi.service;

import com.news.newsapi.domain.News;

public interface ApiService {

	public News getNewsApi();

	public News getNewsSearchApi(String keyword);
}
