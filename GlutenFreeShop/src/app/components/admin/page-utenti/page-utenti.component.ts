import { Component } from '@angular/core';
import { Utente } from 'src/app/models/Utente';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-page-utenti',
  templateUrl: './page-utenti.component.html',
  styleUrls: ['./page-utenti.component.css']
})
export class PageUtentiComponent {

  lista_utenti:Utente[] = []

  constructor(private admin_service:AdminServiceService){}

  ngOnInit(): void {
    this.admin_service.getUtenti().subscribe(data=>{
      console.log("UTENTI", data)
      this.lista_utenti = JSON.parse(JSON.stringify(data))
    })
  }

}
