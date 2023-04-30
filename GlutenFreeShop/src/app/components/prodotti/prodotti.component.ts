import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home-service.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent {
  prodotti: any = [];

  constructor(private home_service: HomeService) {}

  ngOnInit() {
    this.home_service.getAllProdotti().subscribe(data => {

      console.log("GET PRODOTTI", data);
      this.prodotti = data;
    });
  }

}
