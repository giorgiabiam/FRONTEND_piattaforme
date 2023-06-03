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
    });
  }

  addToCart(p: Prodotto){
    console.log("prodotto", p);
    this.home_service.addToCart(p.codice, 1).subscribe(data =>{
      console.log("ADD -- carrello", data)
    });
  }

  search(){
    this.prodotti_filtrati = this.prodotti.filter(p =>
      p.descrizione.trim().toLowerCase().includes(this.parola_chiave.toLowerCase())
    )

    this.prodotti_filtrati.sort((a, b)=> a.codice - b.codice)
  }

}
