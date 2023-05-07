import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) {}

  getAllProdotti() {
    return this.http.get("https://localhost:8443/prodotti/");
  }

}
