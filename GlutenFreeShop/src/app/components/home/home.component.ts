import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  loggato=false;
  parola_chiave:String = "";

  constructor(private home_service:HomeService){}

  ngOnInit(): void {
    let el = document.getElementById("logout_button")

    if(sessionStorage.getItem("user_id")==null){
      this.loggato = false
      el?.removeAttribute("hidden")
    }
    else{
      this.loggato = true
      el?.setAttribute("hidden", "hidden")
    }

    console.log("home -> utente:", sessionStorage.getItem("user_id"))
    console.log("home -> token:", sessionStorage.getItem("token"))
    console.log("home -> loggato?", this.loggato)
  }

  logout(){
    console.log("logout per l'utente: ", sessionStorage.getItem("user_id"))
    sessionStorage.clear();
    window.location.reload();
    this.home_service.svuota_carrello().subscribe(data=>{
      console.log("carrello al logout", data)
    })
  }

  comunicazione(event: any){
    this.loggato = event
    console.log("l'utente è loggato?", event)
  }
}
