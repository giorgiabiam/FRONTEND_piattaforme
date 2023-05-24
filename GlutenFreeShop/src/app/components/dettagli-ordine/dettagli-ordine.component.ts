import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Acquisto } from 'src/app/models/Acquisto';
import { HomeService } from 'src/app/services/home-service.service';

@Component({
  selector: 'app-dettagli-ordine',
  templateUrl: './dettagli-ordine.component.html',
  styleUrls: ['./dettagli-ordine.component.css']
})
export class DettagliOrdineComponent implements OnInit{

  acquisto!:Acquisto;

  constructor(private home_service:HomeService,private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      console.log( "id", params)
      this.home_service.getAcquistoById(params.id).subscribe(data=>{
        this.acquisto.id = JSON.parse(JSON.stringify(data) )
        console.log("ACQUISTO ", this.acquisto)
      });
    })
  }
}
