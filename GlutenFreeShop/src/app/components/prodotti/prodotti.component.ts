import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/homeService';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.css']
})
export class ProdottiComponent {
  prodotti=[];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    // this.homeService.getAllProdotti();
    console.log("init prodotti")
  }

}
