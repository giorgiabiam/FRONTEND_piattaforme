import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrello } from 'src/app/models/Carrello';
import { Prodotto } from 'src/app/models/Prodotto';
import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello!: Carrello;
  vuoto:boolean = true;
  ok_acquisto:boolean = false

  constructor(private user_service : UserService, private home_service : HomeService, private router:Router){ }

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
      console.log("CARRELLO", this.carrello)
      console.log("MAP", this.carrello.map)
      console.log("lista", this.carrello.listaProdottiReal)

      if(this.carrello.totale == 0){
        this.vuoto = true
      }
      else{
        this.vuoto = false
      }
    })

    console.log("carrello -> user id:", sessionStorage.getItem("user_id"))
    console.log("carrello -> token:", sessionStorage.getItem("token"))
  }

  rimuovi_dal_carrello(p:Prodotto){
    console.log("tolgo dal carrello ", p)
    this.home_service.removeFromCart(p.codice).subscribe(data=>{
      if(data==null){ //rimozione non è andata a buon fine
        console.log("errore rimozione")
      }
      this.carrello = JSON.parse(JSON.stringify(data))
    });
  }

  procedi(){
    let id_utente = sessionStorage.getItem("user_id")
    if(id_utente==null){
      this.router.navigate(['login'])
    }

    //TODO se il carrello è vuoto non fare l'acquisto
    if(this.carrello.totale==0){
      alert("non puoi acquistare un carrello vuoto!")
      this.vuoto=true
      return
    }

    this.user_service.acquista(id_utente, this.carrello).subscribe( data=>{
      console.log("dati acquisto andato a buon fine ", data)
      this.ok_acquisto = true
      this.home_service.svuota_carrello().subscribe( data=>{
        console.log("carrello svuotato dopo l'acquisto", data);
        this.vuoto = true
      });
    });
  }

  stampa_quantita(p:Prodotto){
    let a =  this.carrello.map.get(p.codice)
    console.log("quantità ", a)
  }

}


