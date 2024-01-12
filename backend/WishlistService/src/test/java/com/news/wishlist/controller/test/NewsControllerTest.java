//package com.news.wishlist.controller.test;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import com.news.wishlist.controller.NewsController;
//import com.news.wishlist.domain.News;
//import com.news.wishlist.exception.NewsAlreadyExistsException;
//import com.news.wishlist.exception.NewsNotFoundException;
//import com.news.wishlist.service.NewsService;
//
//public class NewsControllerTest {
//
//    @Mock
//    private NewsService newsService;
//
//    @InjectMocks
//    private NewsController newsController;
//
//    @Test
//    public void testSaveNews_Success() throws NewsAlreadyExistsException {
//        // Arrange
//        News news = new News(); // Set up your News object
//
//        when(newsService.saveNews(any(News.class))).thenReturn(true);
//
//        // Act
//        ResponseEntity<?> responseEntity = newsController.saveNews(news);
//
//        // Assert
//        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
//        assertEquals(news, responseEntity.getBody());
//    }
//
//    @Test
//    public void testSaveNews_DuplicateNews() throws NewsAlreadyExistsException {
//        // Arrange
//        News news = new News(); // Set up your News object
//
//        when(newsService.saveNews(any(News.class)))
//                .thenThrow(new NewsAlreadyExistsException("News already exists"));
//
//        // Act
//        ResponseEntity<?> responseEntity = newsController.saveNews(news);
//
//        // Assert
//        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
//        assertEquals("News already exists", responseEntity.getBody());
//    }
//
//    @Test
//    public void testDeleteNews_Success() throws NewsNotFoundException {
//        // Arrange
//        int newsId = 1;
//
//        // Act
//        ResponseEntity<?> responseEntity = newsController.deleteNews(newsId);
//
//        // Assert
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals("News deleted successfully!", responseEntity.getBody());
//        verify(newsService, times(1)).deleteNewsById(newsId);
//    }
//
//    @Test
//    public void testDeleteNews_NewsNotFound() throws NewsNotFoundException {
//        // Arrange
//        int newsId = 1;
//
//        when(newsService.deleteNewsById(newsId))
//                .thenThrow(new NewsNotFoundException("News not found"));
//
//        // Act
//        ResponseEntity<?> responseEntity = newsController.deleteNews(newsId);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
//        assertEquals("News not found", responseEntity.getBody());
//    }
//
//    @Test
//    public void testGetMyFavouriteNews_Success() throws NewsNotFoundException {
//        // Arrange
//        String userId = "user123";
//        List<News> newsList = new ArrayList<>(); // Set up your list of News objects
//
//        when(newsService.getNews(userId)).thenReturn(newsList);
//
//        // Act
//        ResponseEntity<?> responseEntity = newsController.getMyFavouriteNews(userId);
//
//        // Assert
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(newsList, responseEntity.getBody());
//    }
//
//    @Test
//    public void testGetMyFavouriteNews_NewsNotFound() throws NewsNotFoundException {
//        // Arrange
//        String userId = "user123";
//
//        when(newsService.getNews(userId))
//                .thenThrow(new NewsNotFoundException("News not found"));
//
//        // Act
//        ResponseEntity<?> responseEntity = newsController.getMyFavouriteNews(userId);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
//        assertEquals("News not found", responseEntity.getBody());
//    }
//}
