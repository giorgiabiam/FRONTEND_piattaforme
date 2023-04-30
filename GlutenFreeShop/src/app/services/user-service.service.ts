import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions={
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  public login(username: string, password: string){
    return this.http.get("https://localhost:8443/utenti/login/"+ username + "/" + password, httpOptions);
  }

  public signin(username: string, password: string, nome:String, cognome:string, indirizzo:string, convenzionato:boolean){
    return this.http.post("https://localhost:8443/utenti/new", httpOptions);
  }
}
