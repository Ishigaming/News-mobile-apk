import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  private apiKey = '646c811dbe9c4f638a484469baa55586';
  private baseUrl = 'https://newsapi.org/v2'

  constructor(private http: HttpClient) {}

    getTopHeadlines(country: string = 'us'): Observable<any> {
      return this.http.get(`${this.baseUrl}/top-headlines?country=${country}&apikey=${this.apiKey}`);
    }
    searchNews(query: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/everything?q=${query}&apiKey=${this.apiKey}`);
    }
}
