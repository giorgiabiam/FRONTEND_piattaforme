import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prodotto } from 'src/app/models/Prodotto';
import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent {
  prodotti: Prodotto[] = [];
  prodotti_filtrati: Prodotto[] = [];

  loggato : boolean = false;
  parola_chiave:string ="";

  constructor(private home_service: HomeService, private user_service: UserService,
            private router:Router) {}

  ngOnInit() {

    console.log("prodotti-component -> utente:", sessionStorage.getItem("user_id"))
    if(sessionStorage.getItem("user_id")==null){
      this.loggato = false
    }
    else{
      this.loggato = true
    }
    this.home_service.getAllProdotti().subscribe(data => {
      this.prodotti = data;
      console.log("GET PRODOTTI", this.prodotti);

      if(sessionStorage.getItem("user_id") != null) {this.loggato=true}
      this.search();
      console.log("prodotti filtrati", this.prodotti_filtrati)
    });
  }

  addToFav(prodotto:any){
    console.log("FAV", prodotto)

    if(this.loggato){
      let id_utente = sessionStorage.getItem("user_id");
      this.user_service.addToFavorites(id_utente, prodotto);
    }
    else{
      alert("Ops! per aggiungere un prodotto ai preferiti devi accedere all'area personale.");
      this.router.navigate(['login'])
    }
  }

  addToCart(p: Prodotto){
    if(this.loggato){
      console.log("prodotto", p);
      this.home_service.addToCart(p.codice).subscribe(data =>{
        console.log("ADD -- carrello", data)
      });
    }
    else{
      alert("Ops! per aggiungere un prodtto al carrello devi accedere all'area personale.");
      this.router.navigate(['login'])
    }
  }

  search(){
    this.prodotti_filtrati = this.prodotti.filter(p =>
      p.descrizione.trim().toLowerCase().includes(this.parola_chiave.toLowerCase())
      //TODO deve cercare anche nel nome
      // p.nome.trim().toLowerCase().includes(this.parola_chiave.toLowerCase())
    )
  }

}
