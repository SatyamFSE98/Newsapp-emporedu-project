import { Component, OnInit } from '@angular/core';

import { WishlistService } from '../_services/wishlist.service';
import { Articlewishlist } from '../_models/articlewishlist';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlist: Articlewishlist[] = [];
  favorite: boolean = true;

  constructor(private wishlistService: WishlistService, private router: Router) {
    this.wishlistService.getWishlist("3").subscribe((wishlist) => {
      this.wishlist = wishlist;
      console.log(this.wishlist);
    });
  }
  ngOnInit(): void {
   console.log("wishlist working");
  }

  

  removeFromWishlist(id: number) {
    this.wishlistService.removeFromWishlist(id);
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'News Removed.',
      showConfirmButton: false,
      timer: 1800,
    });
  }

  toggleContent(news: any): void {
    news.showFullContent = !news.showFullContent;
  }

  toggleFavorite(news: any): void {
    news.favorite = !news.favorite;
  }

 
  navigateToNewsDetail(news: any): void {

    this.router.navigate(['/newsdetail', { title: news.title, urlToImage: news.urlToImage, description: news.description }]);
  }


}



