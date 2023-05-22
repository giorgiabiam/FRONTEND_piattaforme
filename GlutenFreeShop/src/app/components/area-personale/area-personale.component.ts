import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Acquisto } from 'src/app/models/Acquisto';
import { Utente } from 'src/app/models/Utente';
import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css']
})
export class AreaPersonaleComponent {
  utente!: Utente;
  username:String='';
  password:String='';
  acquisti:Acquisto[];

  login_ok: boolean = false;
  nuovoUtente: boolean=true;
  hide: boolean= true;
  loggato : boolean = false;   //questo lo dovrei mandare al parent
  dialog : boolean = false

  sign_username:String='';
  sign_password:String='';
  sign_firstname:String='';
  sign_lastname:String='';
  sign_address:String='';
  sign_convenzionato: boolean=false;
  signin_ok: boolean = false;

  constructor(private user_service: UserService, private home_service: HomeService, private router:Router) {
    this.acquisti = []
  }

  ngOnInit() {
    console.log("area-personale -> utente:", sessionStorage.getItem("user_id"))
    console.log("area-personale -> token:", sessionStorage.getItem("token"))

    if(sessionStorage.getItem("user_id")==null){
      this.loggato = false
    }
    else{
      this.loggato = true
      this.getUser();
    }
  }

  login(){
    this.user_service.login(this.username, this.password).subscribe({
      next:data =>{ //login andato a buon fine

        console.log("LOGIN----", data)  //data nel back è di tipo JwtResponse che ha (String jwt, int idUtente)
        this.login_ok = true;
        this.loggato = true;
        let response = JSON.parse(JSON.stringify(data));
        const jwt = response.token
        const idutente = response.idutente

        sessionStorage.setItem("user_id", idutente);
        sessionStorage.setItem("token", jwt);

        this.getUser();
      },

      error:err =>{
        this.login_ok = false;
        this.loggato = false;
        console.log("error", err);

        //TODO comunca error message visivamente
      }
    });
  }

  getUser(){
    let id = sessionStorage.getItem("user_id")
    this.user_service.getById(id).subscribe(data=>{
      console.log("GET USER", data)
      this.utente = JSON.parse(JSON.stringify(data));

      this.user_service.getAcquisti(id).subscribe(data=>{
        console.log("acquisti dell'utente ",id, ": ", data)
        let lista:Acquisto[] = []

        for(let a of JSON.parse(JSON.stringify(data))){
          console.log("A: ", a)
          let acquisto:Acquisto = new Acquisto(a.dataAcquisto, a.listaProdotti, a.tot)
          lista.push(acquisto)
        }
        this.acquisti = lista
        console.log("this acquisti ", this.acquisti)
      });

    })
  }

  signin(){
    let newUtente = new Utente( this.sign_username, this.sign_password, this.sign_firstname, this.sign_lastname,
                            this.sign_address, this.sign_convenzionato);

    this.user_service.signin(newUtente).subscribe(data=>{
          console.log("SIGNIN----", data)
          if(data==null){
            this.signin_ok = false;
            this.loggato = false;
          }
          else{
            //signin andato a buon fine
            this.signin_ok = true;
            this.loggato = true;

            let response = JSON.parse(JSON.stringify(data));
            sessionStorage.setItem("user_id", response.utente.id);
          }
        });
  }

  logout(){
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['login'])  //TODO redirect a home
    this.home_service.svuota_carrello().subscribe(data=>{
      console.log("carrello al logout", data)
    })
  }

  showCarrello(){
    this.router.navigate(['carrello'])
  }

  showAcquisti(){
    // this.getUser();
    this.dialog = true;
  }

}

