import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Articlewishlist } from '../_models/articlewishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlist: Articlewishlist[] = [];
  private wishlistSubject = new BehaviorSubject<Articlewishlist[]>([]);


  getWishlist(userId: string) {
    // Assuming you have a backend endpoint for fetching articles by user ID
    const backendUrl = `http://54.220.198.214:8585/api/news/get/${userId}`;

    // Send a GET request to the backend to fetch the wishlist for the specified user ID
    this.http.get<Articlewishlist[]>(backendUrl).subscribe(
      response => {
        console.log('Wishlist fetched:', response);

        // Update the local wishlist array and notify subscribers
        this.wishlist = response;
        this.wishlistSubject.next(this.wishlist);
      },
      error => {
        console.error('Error fetching wishlist:', error);
      }
    );

    // Return the observable for external subscribers
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(article: Articlewishlist) {
    if (article != null) {
      console.log(article);

      // Assuming you have a backend endpoint for adding articles to the wishlist

      const backendUrl = 'http://54.220.198.214:8585/api/news';
      article.userId = "3";
      // Send a POST request to the backend with the article data
      this.http.post(backendUrl, article).subscribe(
        response => {
          console.log('Article added to wishlist:', response);

          // Update the local wishlist array and notify subscribers
          this.wishlist.push(article);
          this.wishlistSubject.next(this.wishlist);
        },
        error => {
          console.error('Error adding article to wishlist:', error);
        }
      );
    }
  }
  removeFromWishlist(id: number) {
    const backendUrl = `http://54.220.198.214:8585/api/news/${id}`;

    this.http.delete(backendUrl).subscribe(
      response => {
        console.log('Article removed from wishlist:', response);
        this.wishlist = this.wishlist.filter((a) => a.id !== id);
        this.wishlistSubject.next(this.wishlist);
      },
      error => {
        console.error('Error removing article from wishlist:', error);
      }
    );
  }
  isInWishlist(articleTitle: string): boolean {
    return this.wishlist.some(item => item.title === articleTitle);
  }

  constructor(private http: HttpClient) { }
}
