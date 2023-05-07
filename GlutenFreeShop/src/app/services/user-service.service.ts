import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from '../models/Utente';

const httpOptions={
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  public login(username: String, password: String){
    return this.http.get("https://localhost:8443/utenti/login/"+ username + "/" + password, httpOptions);
  }

  public signin(nuovoUtente: Utente){
    return this.http.post("https://localhost:8443/utenti/", nuovoUtente, httpOptions);
  }

  addToFavorites(){
    //return this.http.post("https://localhost:8443/utenti/{id}", httpOptions); //TODO
  }
}
