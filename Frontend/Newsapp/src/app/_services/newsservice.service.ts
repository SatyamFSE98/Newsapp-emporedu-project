import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsApiResponse } from '../_models/news-api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  private apiUrl = 'http://54.220.198.214:8090';

  constructor(private http: HttpClient,) { }

  getNews(): Observable<NewsApiResponse> {
    return this.http.get<NewsApiResponse>(this.apiUrl + "/search/news");

  }

  searchNews(keyword: string): Observable<NewsApiResponse> {
    const url = `${this.apiUrl}/search?q=${keyword}`;
    return this.http.get<NewsApiResponse>(url);
  }
}
