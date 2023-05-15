import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent {
  prodotti: any = [];
  loggato : boolean = false;

  constructor(private home_service: HomeService, private user_service: UserService) {}

  ngOnInit() {
    this.home_service.getAllProdotti().subscribe(data => {
      console.log("GET PRODOTTI", data);
      this.prodotti = data;
      if(sessionStorage.getItem("user_id") != null) {this.loggato=true}
    });
    console.log("session get user id------", sessionStorage.getItem("user_id"))
  }

  addToFav(prodotto:any){
    console.log("FAV", prodotto)

    if(this.loggato){
      let id_utente = sessionStorage.getItem("user_id");
      this.user_service.addToFavorites(id_utente, prodotto);
    }
    else{
      // redirect to /login con alert dicendo che prima ti devi loggare
      alert("Ops! per aggiungere un prodotto ai preferiti devi accedere all'area personale.");
    }
  }

  addToCart(){
    if(this.loggato){
      //aggiungi al carrello che è nella sessione
    }
    else{
      //redirect to login con alert dicendo che prima ti devi loggare
      alert("Ops! per aggiungere un prodtto al carrello devi accedere all'area personale.");
    }
  }

}
