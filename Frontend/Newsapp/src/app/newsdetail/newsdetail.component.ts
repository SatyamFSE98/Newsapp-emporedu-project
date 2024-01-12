import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../_models/article';
import { NewsApiResponse } from '../_models/news-api-response';
import { NewsserviceService } from '../_services/newsservice.service';
import { WishlistService } from '../_services/wishlist.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.css']
})
export class NewsdetailComponent implements OnInit {
  article!: Article;
  newsData!: NewsApiResponse;

  title: string = '';
  description: string = '';
  urlToImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsserviceService,
    private wishlistService: WishlistService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.urlToImage = this.route.snapshot.paramMap.get('urlToImage') || '';
    this.description = this.route.snapshot.paramMap.get('description') || '';
    console.log(this.title);
    console.log(this.urlToImage);
    console.log(this.description);
  }
  goBack(): void {
    this.router.navigate(['/newslist']);
  }
}
