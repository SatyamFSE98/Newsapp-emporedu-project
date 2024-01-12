package com.news.wishlist.controller;




import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.news.wishlist.exception.NewsAlreadyExistsException;
import com.news.wishlist.exception.NewsNotFoundException;
import com.news.wishlist.feign.AuthClient;
import com.news.wishlist.model.ApiResponse;
import com.news.wishlist.model.Wishlist;
import com.news.wishlist.service.WishlistService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/api/news")
public class WishlistController {

	
	private final WishlistService newsService;
	
	private final AuthClient authClient;
	@Autowired
	public WishlistController(WishlistService newsService , AuthClient authClient) {
		this.newsService=newsService;
		this.authClient =authClient;
	}
	

	@PostMapping
	public ResponseEntity<?> saveNews(@RequestBody Wishlist news ) throws Exception  {

		ResponseEntity<?> responseEntity;
		try {

				newsService.saveNews(news);
				responseEntity = new ResponseEntity<Wishlist>(news, HttpStatus.CREATED);
			
			
			
		} catch (NewsAlreadyExistsException e) {
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
		return responseEntity;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteNews(@PathVariable int id) throws Exception {
	    ResponseEntity<?> responseEntity;
	    try {
	        newsService.deleteNewsById(id);
	        ApiResponse apiResponse = new ApiResponse("News deleted successfully!");
	        responseEntity = new ResponseEntity<>(apiResponse, HttpStatus.OK);
	    } catch (NewsNotFoundException e) {
	        ApiResponse apiResponse = new ApiResponse(e.getMessage());
	        responseEntity = new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
	    }

	    return responseEntity;
	}


	@GetMapping("/get/{userId}")
	public ResponseEntity<?> getMyFavouriteNews(@PathVariable String userId) throws Exception {
		ResponseEntity<?> responseEntity;
		try {
			
			
			List<Wishlist> newsList = newsService.getNews(userId);

			responseEntity = new ResponseEntity<List<Wishlist>>(newsList, HttpStatus.OK);
		    
			
		    } catch (NewsNotFoundException e) {
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		   }
		return responseEntity;
	}
}
