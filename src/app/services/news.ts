import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  private apiKey = '646c811dbe9c4f638a484469baa55586';
  private baseUrl = 'https://newsapi.org/v2'

  constructor(private http: HttpClient) {}

  getTopHeadlines(country: string = 'us', page: number = 1, category: string = ''): Observable<any> {
    let url = `${this.baseUrl}/top-headlines?country=${country}&page=${page}&apiKey=${this.apiKey}`;
    
    if (category) {
      url += `&category=${category}`;
    }
  
    return this.http.get(url);
  }
    searchNews(query: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/everything?q=${query}&apiKey=${this.apiKey}`);
    }
}
