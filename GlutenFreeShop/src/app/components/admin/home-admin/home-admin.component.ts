import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {
    console.log("utente in home admin------", sessionStorage.getItem("user_id"))
    console.log("tokne in home admin------", sessionStorage.getItem("token"))
  }

  utenti(){
    this.router.navigate(['admin/utenti'])
  }

  acquisti(){
    this.router.navigate(['admin/acquisti'])
  }


  logout(){
    sessionStorage.clear()
    this.router.navigate(['admin/logout'])
  }


}
