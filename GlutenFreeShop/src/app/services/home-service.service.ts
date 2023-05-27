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
    return this.http.get<Prodotto[]>("https://localhost:8443/prodotti", httpOptions);
  }

  addToCart(codice_prodotto : number, qta:number){
    return this.http.post("https://localhost:8443/carrello", {codice_prodotto, qta}, httpOptions);
  }

  addToCart_nuovo(codice_prodotto : number, qta:number){
    return this.http.post("https://localhost:8443/carrello/aggiungicarrelloitem", {codice_prodotto, qta}, httpOptions);
  }

  getCarrello(){
    return this.http.get("https://localhost:8443/carrello", httpOptions);
  }

  svuota_carrello(){
    return this.http.delete("https://localhost:8443/carrello", httpOptions)
  }

  removeFromCart(id_prodotto:number){
    return this.http.delete("https://localhost:8443/carrello/"+id_prodotto, httpOptions)
  }

  getAcquistoById(id_acq:number){ //TODO forse non serve più
    return this.http.get("https://localhost:8443/acquisti/"+id_acq, httpOptions)
  }

}
