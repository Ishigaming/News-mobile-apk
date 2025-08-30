import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries/flag/unicode'
  
  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
}
