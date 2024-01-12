import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WishlistService } from './wishlist.service';
import { Articlewishlist } from '../_models/articlewishlist';

describe('WishlistService', () => {
  let service: WishlistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WishlistService]
    });

    service = TestBed.inject(WishlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch wishlist for a user', fakeAsync(() => {
    const userId = '3';
    const mockWishlist: Articlewishlist[] = [
      {
        id: 1,
        userId: '3',
        title: 'Sample Article',
        description: 'Sample Description',
        content: 'Sample Content',
        publishedAt: '2023-01-01',
        sourceWebsiteName: 'Sample Source',
        url: 'http://sample-url.com',
        urlToImage: 'http://sample-image.com'
      }
    ];

    service.getWishlist(userId).subscribe((wishlist) => {
      expect(wishlist).toEqual(mockWishlist);
    });

    const req = httpMock.expectOne(`http://localhost:8585/api/news/get/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWishlist);

    tick(); // simulate the passage of time to resolve the observable
  }));

  it('should add an article to the wishlist', fakeAsync(() => {
    const mockArticle: Articlewishlist = {
      id: 1,
      userId: '3',
      title: 'Sample Article',
      description: 'Sample Description',
      content: 'Sample Content',
      publishedAt: '2023-01-01',
      sourceWebsiteName: 'Sample Source',
      url: 'http://sample-url.com',
      urlToImage: 'http://sample-image.com'
    };

    service.addToWishlist(mockArticle);

    const req = httpMock.expectOne('http://localhost:8585/api/news');
    expect(req.request.method).toBe('POST');
    req.flush(mockArticle);

    tick(); // simulate the passage of time to resolve the observable

    // Check if the article is added to the local wishlist
    service.getWishlist('3').subscribe((wishlist) => {
      expect(wishlist).toContain(mockArticle);
    });

    tick(); // simulate the passage of time to resolve the observable
  }));

  it('should remove an article from the wishlist', fakeAsync(() => {
    const articleIdToRemove = 1;

    service.removeFromWishlist(articleIdToRemove);

    const req = httpMock.expectOne(`http://localhost:8585/api/news/${articleIdToRemove}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    tick(); // simulate the passage of time to resolve the observable

    // Check if the article is removed from the local wishlist
    service.getWishlist('3').subscribe((wishlist) => {
      expect(wishlist.some((article) => article.id === articleIdToRemove)).toBeFalsy();
    });

    tick(); // simulate the passage of time to resolve the observable
  }));

  it('should check if an article is in the wishlist', fakeAsync(() => {
    const articleTitleToCheck = 'Sample Article';
    const mockWishlist: Articlewishlist[] = [
      {
        id: 1,
        userId: '3',
        title: 'Sample Article',
        description: 'Sample Description',
        content: 'Sample Content',
        publishedAt: '2023-01-01',
        sourceWebsiteName: 'Sample Source',
        url: 'http://sample-url.com',
        urlToImage: 'http://sample-image.com'
      }
    ];

    service.getWishlist('3').subscribe(() => {
      const isInWishlist = service.isInWishlist(articleTitleToCheck);
      expect(isInWishlist).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8585/api/news/get/3`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWishlist);

    tick(); // simulate the passage of time to resolve the observable
  }));
});
