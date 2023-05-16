import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  loggato=false;
  parola_chiave:String = "";
  logout_alert=false;

  ngOnInit(): void {
    console.log("home, utente:", sessionStorage.getItem("user_id"))
    console.log("home, loggato?", this.loggato)

    let el = document.getElementById("logout_button")

    if(sessionStorage.getItem("user_id")==null){
      this.loggato = false
      el?.removeAttribute("hidden")
    }
    else{
      this.loggato = true
      el?.setAttribute("hidden", "hidden")
    }
  }

  logout(){
    console.log("logout per l'utente: ", sessionStorage.getItem("user_id"))
    alert("sei sicuro di voler uscire?   TODO")
    sessionStorage.clear();
    window.location.reload();
  }

  comunicazione(event: any){
    this.loggato = event
    console.log("l'utente è loggato?", event)
  }
}
