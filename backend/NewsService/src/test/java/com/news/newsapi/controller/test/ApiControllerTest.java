//package com.news.newsapi.controller.test;
//
//import com.news.newsapi.controller.ApiController;
//import com.news.newsapi.domain.News;
//import com.news.newsapi.exception.NoNewsFoundException;
//import com.news.newsapi.service.ApiService;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.when;
//
//public class ApiControllerTest {
//
//    @Mock
//    private ApiService apiService;
//
//    @InjectMocks
//    private ApiController apiController;
//
//    @Test
//    public void testGetNews_Success() {
//        // Arrange
//        News mockedNews = new News(/* Mocked News object */);
//        when(apiService.getNewsApi()).thenReturn(mockedNews);
//
//        // Act
//        News responseEntity = apiController.getNews();
//
//        // Assert
//        assertEquals(HttpStatus.OK, responseEntity.getStatus());
//        //assertEquals(mockedNews, responseEntity.getBody());
//    }
//
//    @Test
//    public void testGetNewsByCountry_Success() throws NoNewsFoundException {
//        // Arrange
//        String keyword = "example";
//        News mockedNews = new News(/* Mocked News object */);
//        when(apiService.getNewsSearchApi(keyword)).thenReturn(mockedNews);
//
//        // Act
//        News responseEntity = apiController.getNewsByCountry(keyword);
//
//        // Assert
//        assertEquals(HttpStatus.OK, responseEntity.getStatus());
//        //assertEquals(mockedNews, responseEntity.getBody());
//    }
//
//    @Test
//    public void testGetNewsByCountry_NoNewsFoundException() throws NoNewsFoundException {
//        // Arrange
//        String keyword = "example";
//        when(apiService.getNewsSearchApi(keyword)).thenThrow(new NoNewsFoundException("No news found"));
//
//        // Act
//        News responseEntity = apiController.getNewsByCountry(keyword);
//
//        // Assert
//        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatus());
//    }
//}
