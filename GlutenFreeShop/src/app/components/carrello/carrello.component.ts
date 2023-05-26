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
  ok_acquisto!:any

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
      let nuova_map = new Map<number, number>();

      // let nuova_lista: Prodotto[] = []

       for(let i=0;  i<this.carrello.listaProdottiReal.length ; i++){
         let p:Prodotto = this.carrello.listaProdottiReal[i]
         let nuovo_p:Prodotto = new Prodotto(p.codice, p.nome, p.qta, p.prezzo, p.descrizione, p.img);
         // nuova_lista.push(nuovo_p)
         nuova_map.set(this.carrello.listaProdottiReal[i].codice, 1)
         //this.carrello.map.get(this.carrello.listaProdottiReal[i].codice)
       }

       this.carrello.map = nuova_map
       console.log("MAP dopo", this.carrello.map)
      // this.carrello.listaProdottiReal = nuova_lista
      // console.log("lista dopo", this.carrello.listaProdottiReal)

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
      this.loadCarrello()
    });
  }

  procedi(){
    let id_utente = sessionStorage.getItem("user_id")
    if(id_utente==null){
      this.router.navigate(['login'])
    }

    // se il carrello è vuoto non deve fare l'acquisto
    if(this.carrello.totale==0){
      alert("non puoi acquistare un carrello vuoto!")
      this.vuoto=true
      return
    }

    this.user_service.acquista(id_utente, this.carrello).subscribe( {
      next:data=>{
        console.log("dati acquisto andato a buon fine ", data)
        this.ok_acquisto = true
        this.home_service.svuota_carrello().subscribe( data=>{
          console.log("carrello svuotato dopo l'acquisto", data);
          this.vuoto = true
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
      this.vuoto = true
    })

  }

  aggiorna_quantita(codice_prodotto:number){
    let x = 5
     this.carrello.map.set(codice_prodotto, x)
      for(let i=0;  i<this.carrello.listaProdottiReal.length ; i++){
        if(this.carrello.listaProdottiReal[i].codice == codice_prodotto){
          this.carrello.listaProdottiReal[i].qta_acquistata = x

        }
      }
     console.log("map con nuova quantità ", this.carrello.map)
     console.log("lista con nuova quantità ", this.carrello.listaProdottiReal)

   // TODO BACKEND fare una post su /carrello
     this.home_service.addToCart(codice_prodotto, x).subscribe(data=>{
       console.log("DATA", data)
       this.carrello.map = JSON.parse(JSON.stringify(data)).map
       this.carrello.totale = JSON.parse(JSON.stringify(data)).totale
     })

  }
}
