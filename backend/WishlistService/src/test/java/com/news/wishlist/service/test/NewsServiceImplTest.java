//package com.news.wishlist.service.test;
//
//
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import com.news.wishlist.exception.NewsAlreadyExistsException;
//import com.news.wishlist.exception.NewsNotFoundException;
//import com.news.wishlist.model.Wishlist;
//import com.news.wishlist.repository.WishlistRepository;
//import com.news.wishlist.service.WishlistServiceImpl;
//
//@ExtendWith(MockitoExtension.class)
//public class NewsServiceImplTest {
//
//    @Mock
//    private WishlistRepository newsRepository;
//
//    @InjectMocks
//    private WishlistServiceImpl newsService;
//
//    @Test
//    public void testSaveNews_Success() {
//        // Arrange
//        Wishlist news = new Wishlist();
//        news.setUserId("user123");
//        news.setTitle("Breaking News");
//        news.setContent("This is a breaking news.");
//
//        when(newsRepository.findByUserIdAndTitle("user123", "Breaking News"))
//                .thenReturn(Optional.empty());
//
//        when(newsRepository.save(news)).thenReturn(news);
//
//        // Act
//        assertDoesNotThrow(() -> newsService.saveNews(news));
//
//        // Assert
//        verify(newsRepository, times(1)).findByUserIdAndTitle("user123", "Breaking News");
//        verify(newsRepository, times(1)).save(news);
//    }
//
//    @Test
//    public void testSaveNews_AlreadyExists() {
//        // Arrange
//        Wishlist news = new Wishlist();
//        news.setUserId("user123");
//        news.setTitle("Breaking News");
//        news.setContent("This is a breaking news.");
//
//        when(newsRepository.findByUserIdAndTitle("user123", "Breaking News"))
//                .thenReturn(Optional.of(news));
//
//        // Act
//        NewsAlreadyExistsException exception = assertThrows(NewsAlreadyExistsException.class,
//                () -> newsService.saveNews(news));
//
//        // Assert
//        assertEquals("News already exists", exception.getMessage());
//        verify(newsRepository, times(1)).findByUserIdAndTitle("user123", "Breaking News");
//        verify(newsRepository, never()).save(any());
//    }
//
//    @Test
//    public void testDeleteNewsById_Success() throws NewsNotFoundException {
//        // Arrange
//        int newsId = 1;
//        Wishlist news = new Wishlist();
//        news.setId(newsId);
//
//        when(newsRepository.findById(newsId)).thenReturn(Optional.of(news));
//
//        // Act
//        assertDoesNotThrow(() -> newsService.deleteNewsById(newsId));
//
//        // Assert
//        verify(newsRepository, times(1)).findById(newsId);
//        verify(newsRepository, times(1)).delete(news);
//    }
//
//    @Test
//    public void testDeleteNewsById_NewsNotFound() {
//        // Arrange
//        int newsId = 1;
//
//        when(newsRepository.findById(newsId)).thenReturn(Optional.empty());
//
//        // Act
//        NewsNotFoundException exception = assertThrows(NewsNotFoundException.class,
//                () -> newsService.deleteNewsById(newsId));
//
//        // Assert
//        assertEquals("News not found!", exception.getMessage());
//        verify(newsRepository, times(1)).findById(newsId);
//        verify(newsRepository, never()).delete(any());
//    }
//
//    @Test
//    public void testGetNews_Success() throws NewsNotFoundException {
//        // Arrange
//        String userId = "user123";
//        List<Wishlist> newsList = new ArrayList<>();
//        Wishlist news1 = new Wishlist();
//        news1.setId(1);
//        news1.setUserId(userId);
//        news1.setTitle("News 1");
//        news1.setContent("Content 1");
//
//        Wishlist news2 = new Wishlist();
//        news2.setId(2);
//        news2.setUserId(userId);
//        news2.setTitle("News 2");
//        news2.setContent("Content 2");
//
//        newsList.add(news1);
//        newsList.add(news2);
//
//        when(newsRepository.findByUserId(userId)).thenReturn(newsList);
//
//        // Act
//        List<Wishlist> result = newsService.getNews(userId);
//
//        // Assert
//        assertEquals(2, result.size());
//        assertEquals(newsList, result);
//        verify(newsRepository, times(1)).findByUserId(userId);
//    }
//
//    @Test
//    public void testGetNews_NewsNotFound() {
//        // Arrange
//        String userId = "user123";
//
//        when(newsRepository.findByUserId(userId)).thenReturn(new ArrayList<>());
//
//        // Act
//        NewsNotFoundException exception = assertThrows(NewsNotFoundException.class,
//                () -> newsService.getNews(userId));
//
//        // Assert
//        assertEquals("News not found!", exception.getMessage());
//        verify(newsRepository, times(1)).findByUserId(userId);
//    }
//}
//
