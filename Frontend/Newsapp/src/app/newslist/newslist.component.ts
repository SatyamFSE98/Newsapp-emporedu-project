import { Component, Input ,OnInit} from '@angular/core';
import { NewsserviceService } from '../_services/newsservice.service';
import { NewsApiResponse } from '../_models/news-api-response';
import { Article } from '../_models/article';
import { WishlistService } from '../_services/wishlist.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent implements OnInit {
  favorite: boolean = true;
  @Input()
  article!: Article;
  searchKeyword: string = '';
  
  newsData!: NewsApiResponse;


  addToWishlist(title: any) {
    console.log(title);
    this.wishlistService.addToWishlist(title);
    Swal.fire({
      icon: 'success',
      title: 'Added to Wishlist!',
      showConfirmButton: false,
      timer: 1800,
    });
  }
  searchNews(): void {
    if (this.searchKeyword.trim() !== '') {
      this.newsService.searchNews(this.searchKeyword).subscribe((data) => {
        this.newsData = data;
      });
    }
  }

  navigateToNewsDetail(news: any): void {

    this.router.navigate(['/newsdetail', { title: news.title, urlToImage: news.urlToImage, description: news.description }]);
  }



  isFavorite(news: any): boolean {
    return news.favorite;
  }




  constructor(private newsService: NewsserviceService, private wishlistService: WishlistService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((data) => {
      this.newsData = data;
      console.log(this.newsData);
    });
  }
}
