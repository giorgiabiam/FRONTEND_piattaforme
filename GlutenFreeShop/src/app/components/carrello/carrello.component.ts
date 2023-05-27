import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrello } from 'src/app/models/Carrello';
import { Prodotto } from 'src/app/models/Prodotto';
import { ItemCarrello } from 'src/app/models/ItemCarrello';

import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello!: Carrello;
  carrello_vuoto:boolean = true;

  ok_acquisto!:any

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

    // console.log("carrello -> user id:", sessionStorage.getItem("user_id"))
    // console.log("carrello -> token:", sessionStorage.getItem("token"))
  }

  rimuovi_dal_carrello(p:Prodotto){
    this.home_service.removeFromCart(p.codice).subscribe({
      next:data=>{
        console.log("rimozione prodotto", p, data)
        this.loadCarrello()
      },
      error:err=>{
        console.log("errore rimozione", err)   //TODO rimozione non è andata a buon fine
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
        this.home_service.svuota_carrello().subscribe( data=>{
          console.log("carrello svuotato dopo l'acquisto", data);
          this.carrello_vuoto = true
        });
      },
      error: err=>{ //TODO gestisci errore di quantità non disponibile
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

  aggiorna_quantita(itemCArrello:ItemCarrello){
     this.home_service.addToCart(itemCArrello.prodotto.codice, itemCArrello.qta_acquist).subscribe(data=>{
      debugger;
       console.log("DATA", data)
       this.carrello = JSON.parse(JSON.stringify(data))
     })

  }
}
