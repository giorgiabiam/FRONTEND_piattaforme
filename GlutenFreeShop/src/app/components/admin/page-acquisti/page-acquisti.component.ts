import { Component, OnInit } from '@angular/core';
import { Acquisto } from 'src/app/models/Acquisto';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-page-acquisti',
  templateUrl: './page-acquisti.component.html',
  styleUrls: ['./page-acquisti.component.css']
})
export class PageAcquistiComponent implements OnInit{

  lista_acquisti!:Acquisto[]

  constructor(private admin_service:AdminServiceService){}

  ngOnInit(): void {
    this.admin_service.getAcquisti().subscribe(data=>{
      console.log("ACQUISTI", data)
      this.lista_acquisti = JSON.parse(JSON.stringify(data))
    })
  }

}
