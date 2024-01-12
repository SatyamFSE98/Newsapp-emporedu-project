package com.news.wishlist.service;

import java.util.List;

import com.news.wishlist.exception.NewsAlreadyExistsException;
import com.news.wishlist.exception.NewsNotFoundException;
import com.news.wishlist.model.Wishlist;



public interface WishlistService 
{
	boolean saveNews(Wishlist news) throws NewsAlreadyExistsException;
	
	boolean deleteNewsById(int id) throws NewsNotFoundException;
	
	List<Wishlist> getNews(String userId) throws NewsNotFoundException;
}
