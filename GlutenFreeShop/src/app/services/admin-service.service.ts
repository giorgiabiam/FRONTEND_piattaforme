import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions={
  headers: new HttpHeaders({})
}

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) {}

  getUtenti(){
    return this.http.get("https://localhost:8443/admin/userlist", httpOptions);
  }

  getAcquisti(){
    return this.http.get("https://localhost:8443/admin/acquistilist", httpOptions);
  }

}
