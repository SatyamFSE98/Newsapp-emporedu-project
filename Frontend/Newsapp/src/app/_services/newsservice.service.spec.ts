import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NewsserviceService } from './newsservice.service';
import { NewsApiResponse } from '../_models/news-api-response';

describe('NewsserviceService', () => {
  let service: NewsserviceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsserviceService],
    });
    service = TestBed.inject(NewsserviceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get news', () => {
    const dummyNews: NewsApiResponse = {
      status: 'ok',
      totalResults: 2,
      articles: [
        {
          source: { id: '1', name: 'Source 1' },
          author: 'Author 1',
          title: 'Title 1',
          description: 'Description 1',
          url: 'https://example.com/article1',
          urlToImage: 'https://example.com/image1.jpg',
          publishedAt: '2022-01-01T12:00:00Z',
          content: 'Content 1',
        },
        {
          source: { id: '2', name: 'Source 2' },
          author: 'Author 2',
          title: 'Title 2',
          description: 'Description 2',
          url: 'https://example.com/article2',
          urlToImage: 'https://example.com/image2.jpg',
          publishedAt: '2022-01-02T12:00:00Z',
          content: 'Content 2',
        },
      ],
    };

    service.getNews().subscribe((news) => {
      expect(news).toEqual(dummyNews);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/search/news');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyNews);
  });

  it('should search news', () => {
    const keyword = 'Angular';

    const dummySearchResult: NewsApiResponse = {
      status: 'ok',
      totalResults: 1,
      articles: [
        {
          source: { id: '3', name: 'Source 3' },
          author: 'Author 3',
          title: 'Angular News',
          description: 'Latest Angular updates',
          url: 'https://example.com/angular-news',
          urlToImage: 'https://example.com/angular-image.jpg',
          publishedAt: '2022-01-03T12:00:00Z',
          content: 'Angular content',
        },
      ],
    };

    service.searchNews(keyword).subscribe((searchResult) => {
      expect(searchResult).toEqual(dummySearchResult);
    });

    const req = httpTestingController.expectOne(`http://localhost:8090/search?q=${keyword}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummySearchResult);
  });
});
