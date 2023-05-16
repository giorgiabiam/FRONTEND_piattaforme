import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../models/Utente';
import { Prodotto } from '../models/Prodotto';
import { Carrello } from '../models/Carrello';


const httpOptions={
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  public login(username: String, password: String){
    return this.http.post("https://localhost:8443/utenti/login", {username, password}, httpOptions);
  }

  public signin(nuovoUtente: Utente){
    return this.http.post("https://localhost:8443/utenti/", nuovoUtente, httpOptions);
  }

  //id_utente deve essere string non any
  addToFavorites(id_utente: any, prodotto: Prodotto){
    return this.http.post("https://localhost:8443/utenti/"+id_utente , {prodotto}, httpOptions);
  }

  get(id_utente: any){
    return this.http.get("https://localhost:8443/utenti/"+id_utente, httpOptions);
  }

  acquista(id_utente: any, carrello:Carrello){
    return this.http.post("https://localhost:8443/acquisti/"+id_utente, carrello, httpOptions);
  }
}
