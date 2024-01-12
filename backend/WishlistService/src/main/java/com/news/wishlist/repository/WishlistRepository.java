package com.news.wishlist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.news.wishlist.model.Wishlist;



public interface WishlistRepository extends JpaRepository<Wishlist, Integer> 
{
	List<Wishlist> findByUserId(String userId);
	
	Optional<Wishlist> findByUserIdAndTitle(String userId, String title);
}
