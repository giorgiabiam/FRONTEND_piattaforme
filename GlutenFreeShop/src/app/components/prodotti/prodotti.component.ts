import { HttpRequest } from '@angular/common/http';
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

  constructor(private home_service: HomeService, private user_service: UserService) {}

  ngOnInit() {
    this.home_service.getAllProdotti().subscribe(data => {
      console.log("GET PRODOTTI", data);
      this.prodotti = data;
    });
  }

  addToFav(){
    // if(utenteLoggato){
      this.user_service.addToFavorites();
    // }
    // else{
      // redirect to login con alert dicendo che ti devi loggare
    // }// if(utenteLoggato){
      this.user_service.addToFavorites();
    // }
    // else{
      // redirect to login con alert dicendo che ti devi loggare
    // }
  }

  addToCart(){
    // if(utenteLoggato){
      //aggiungi al carrello
    // }
    // else{
      // redirect to login con alert dicendo che ti devi loggare
    // }
  }

}
