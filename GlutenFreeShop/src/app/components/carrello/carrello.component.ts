import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrello } from 'src/app/models/Carrello';
import { Prodotto } from 'src/app/models/Prodotto';
import { ItemCarrello } from 'src/app/models/ItemCarrello';

import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { Utente } from 'src/app/models/Utente';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello!: Carrello;
  carrello_vuoto:boolean = true;

  ok_acquisto!:any
  indirizzo!:String

  constructor(private user_service : UserService, private home_service : HomeService, private router:Router){ }

  ngOnInit(): void {
    let id_utente = sessionStorage.getItem("user_id")
    if(id_utente==null){
      this.home_service.svuota_carrello();
      this.carrello_vuoto = true
    }
    this.loadCarrello();
  }

  loadCarrello() {
    this.home_service.getCarrello().subscribe(data=>{
      this.carrello = JSON.parse(JSON.stringify(data))
      console.log("CARRELLO", this.carrello)
      console.log("lista", this.carrello.lista)
      console.log("totale", this.carrello.totale)

      if(this.carrello.lista.length != 0){
        this.carrello_vuoto = false
      }
    })
  }

  rimuovi_dal_carrello(p:Prodotto){
    this.home_service.removeFromCart(p.codice).subscribe({
      next:data=>{
        console.log("rimozione prodotto", p, data)
        this.loadCarrello()
      },
      error:err=>{
        console.log("errore rimozione", err)
      }
    })
  }

  procedi(){
    let id_utente = sessionStorage.getItem("user_id")
    if(id_utente==null){
      this.router.navigate(['login'])
    }

    // se il carrello è vuoto non deve fare l'acquisto
    if(this.carrello.totale==0){
      this.carrello_vuoto=true
      return
    }

    this.user_service.acquista(id_utente, this.carrello).subscribe( {
      next:data=>{
        console.log("dati acquisto andato a buon fine ", data)
        this.ok_acquisto = true
        this.getIndirizzo()
        this.home_service.svuota_carrello().subscribe( data=>{
          console.log("carrello svuotato dopo l'acquisto", data);
          this.carrello_vuoto = true
        });
      },
      error: err=>{
        this.ok_acquisto = false
        console.log("errore acquisto", err)
      }
    })

  }

  svuota_carrello(){
    this.home_service.svuota_carrello().subscribe(data=>{
      console.log("carrello svuotato ", data)
      this.loadCarrello();
      this.carrello_vuoto = true
    })

  }

  aggiorna_quantita(itemCarrello:ItemCarrello){
    console.log("aggiorna qta", itemCarrello)
    if(itemCarrello.qta_acquist == 0){
      this.rimuovi_dal_carrello(itemCarrello.prodotto)
    }
    else{
      this.home_service.addToCart(itemCarrello.prodotto.codice, itemCarrello.qta_acquist).subscribe(data=>{
        console.log("DATA", data)
        this.carrello = JSON.parse(JSON.stringify(data))
      })
    }
  }

  getIndirizzo(){
    let id = sessionStorage.getItem("user_id")

    this.user_service.getById(id).subscribe(data=>{
      console.log("GET INDIRIZZO", data)
      let utente:Utente = JSON.parse(JSON.stringify(data));

      this.indirizzo =  utente.indirizzo

    })
  }
}
