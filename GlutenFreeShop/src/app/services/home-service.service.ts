import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prodotto } from '../models/Prodotto';

const httpOptions={
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getAllProdotti() {
    return this.http.get<Prodotto[]>("https://localhost:8443/prodotti/", httpOptions);
  }

  addToCart(codice_prodotto : number){
    return this.http.post("https://localhost:8443/carrello", codice_prodotto, httpOptions);
  }

  getCarrello(){
    return this.http.get("https://localhost:8443/carrello", httpOptions);
  }

}
