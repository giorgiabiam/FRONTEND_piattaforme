import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home-service.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit {
  carrello: any=[];
  totale: number;

  constructor(private home_service : HomeService){
    this.totale = 0;
  }

  ngOnInit(): void {
    this.loadCarrello();
    this.calcolaTot();
  }

  loadCarrello() {
    // il carrello sta nella sessione, come lo prendo?
  }

  calcolaTot(){

  }

  procedi(){
    //TODO
  }

}


