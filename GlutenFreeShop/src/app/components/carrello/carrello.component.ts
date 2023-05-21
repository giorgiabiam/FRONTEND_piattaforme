import { Component, OnInit } from '@angular/core';
import { Carrello } from 'src/app/models/Carrello';
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
  vuoto:boolean = true;

  constructor(private user_service : UserService, private home_service : HomeService){
    this.totale = 0;
  }

  ngOnInit(): void {
    let id_utente = sessionStorage.getItem("user_id")
    if(id_utente==null){
      this.home_service.svuota_carrello();
      this.vuoto = true
    }
    this.loadCarrello();
  }

  loadCarrello() {
    this.home_service.getCarrello().subscribe(data=>{

      this.carrello = JSON.parse(JSON.stringify(data))
      console.log("carrello", this.carrello)
      console.log("lista prodotti", this.carrello.listaProdotti)
      console.log("tot", this.totale)

      if(this.carrello.listaProdotti.length == 0){
        this.vuoto = true
      }
      else this.vuoto = false
    })

    console.log("carrello -> user id:", sessionStorage.getItem("user_id"))
    console.log("carrello -> token:", sessionStorage.getItem("token"))

  }

  procedi(){
    let id_utente = sessionStorage.getItem("user_id")
    this.user_service.getById(id_utente).subscribe(data=>{
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


