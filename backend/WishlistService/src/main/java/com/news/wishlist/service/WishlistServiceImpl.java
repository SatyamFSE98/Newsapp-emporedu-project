package com.news.wishlist.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.news.wishlist.exception.NewsAlreadyExistsException;
import com.news.wishlist.exception.NewsNotFoundException;
import com.news.wishlist.model.Wishlist;
import com.news.wishlist.repository.WishlistRepository;

@Service
public class WishlistServiceImpl implements WishlistService {
	@Autowired
	private WishlistRepository newsRepository;

	@Override
	public boolean saveNews(Wishlist news) throws NewsAlreadyExistsException {

		Optional<Wishlist> checkNews = newsRepository.findByUserIdAndTitle(news.getUserId(), news.getTitle());

		if (checkNews.isPresent())
			throw new NewsAlreadyExistsException("News already exists");

		newsRepository.save(news);
		return true;
	}

	@Override
	public boolean deleteNewsById(int id) throws NewsNotFoundException {
		Wishlist news = newsRepository.findById(id).orElse(null);
		if (news == null) {
			throw new NewsNotFoundException("News not found!");
		}

		newsRepository.delete(news);
		return true;
	}

	@Override
	public List<Wishlist> getNews(String userId) throws NewsNotFoundException {
		List<Wishlist> newsList = (List<Wishlist>) newsRepository.findByUserId(userId);
		if (newsList.size() == 0)
			throw new NewsNotFoundException("News not found!");
		return newsList;
	}
}
