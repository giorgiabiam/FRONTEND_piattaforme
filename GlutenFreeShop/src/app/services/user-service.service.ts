import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../models/Utente';
import { Prodotto } from '../models/Prodotto';
import { Carrello } from '../models/Carrello';


const httpOptions={
  headers: new HttpHeaders({

  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  public login(username: String, password: String){
    return this.http.post("https://localhost:8443/utenti/auth/login", {username, password}, httpOptions);
  }

  public signin(nuovoUtente: Utente){
    return this.http.post("https://localhost:8443/utenti/auth/registrazione", nuovoUtente, httpOptions);
  }

  getById(id_utente: any){
    return this.http.get("https://localhost:8443/utenti/"+id_utente, httpOptions);
  }

  acquista(id_utente: any, carrello:Carrello){
    console.log("carrello da acquistare", carrello)
    return this.http.post("https://localhost:8443/acquisti/"+id_utente, carrello, httpOptions)
  }

  getAcquisti(id_utente:any){
    return this.http.get("https://localhost:8443/acquisti/utente/"+id_utente, httpOptions);
  }
}
