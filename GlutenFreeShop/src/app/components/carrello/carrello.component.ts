import { Component, OnInit } from '@angular/core';
import { Carrello } from 'src/app/models/Carrello';
import { Utente } from 'src/app/models/Utente';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello!: Carrello;
  totale: number;

  constructor(private user_service : UserService){
    this.totale = 0;
  }

  ngOnInit(): void {
    this.loadCarrello();
    this.calcolaTot();
  }

  loadCarrello() {
    // il carrello sta nella sessione
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


