import { Component, OnInit } from '@angular/core';
import { Carrello } from 'src/app/models/Carrello';
import { Utente } from 'src/app/models/Utente';
import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello!: Carrello;
  totale: number;

  constructor(private user_service : UserService, private home_service : HomeService){
    this.totale = 0;
  }

  ngOnInit(): void {
    this.loadCarrello();
    this.calcolaTot();
  }

  loadCarrello() {
    this.home_service.getCarrello().subscribe(data=>{
      // this.carrello = data  //TODO mappare ?
      console.log("carrello", data)
    })
  }

  calcolaTot(){

  }

  procedi(){
    let id_utente = sessionStorage.getItem("user_id")
    this.user_service.get(id_utente).subscribe(data=>{
      // let utente:Utente = data
      // if(utente.convenzionato){
      //   alert("Vuoi usare il buono celiachia?") //TODO
      // }
    })

    this.user_service.acquista(id_utente, this.carrello).subscribe( data=>{
      console.log("acquisto", data)
    })

  }

}


