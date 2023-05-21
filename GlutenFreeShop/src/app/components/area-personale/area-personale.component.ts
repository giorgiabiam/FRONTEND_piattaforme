import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Carrello } from 'src/app/models/Carrello';
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
  login_ok: boolean = false;

  nuovoUtente: boolean=true;
  hide: boolean= true;
  loggato : boolean = false;   //questo lo dovrei mandare al parent
  dialogPref : boolean = false;
  dialogAcq : boolean = false


  sign_username:String='';
  sign_password:String='';
  sign_firstname:String='';
  sign_lastname:String='';
  sign_address:String='';
  sign_convenzionato: boolean=false;
  signin_ok: boolean = false;


  preferiti=[];
  acquisti=[];
  // carrello:Carrello;

  constructor(private user_service: UserService, private home_service: HomeService, private router:Router) { }

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
    //TODO get utente by id così mi slavo solo l'id nella sessione
  }

  login(){
    this.user_service.login(this.username, this.password).subscribe({
      next:data =>{        //login andato a buon fine

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

        //TODO comunca error message
      }
    });
  }

  getUser(){
    let id = sessionStorage.getItem("user_id")
    this.user_service.getById(id).subscribe(data=>{
      console.log("GET USER", data)
      this.utente = JSON.parse(JSON.stringify(data));
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

  showPreferiti(){
    console.log("user id nei preferiti", sessionStorage.getItem("user_id"));

    this.user_service.getById(sessionStorage.getItem("user_id")).subscribe(data =>{
      let u = JSON.stringify(data)
      this.preferiti = JSON.parse(u).preferiti;
      console.log("preferiti", JSON.parse(u).preferiti)
      this.dialogPref = true;
    })
  }

  showCarrello(){
    this.router.navigate(['carrello'])
  }

  showAcquisti(){
    console.log("user id in mostra acquisti", sessionStorage.getItem("user_id"));

    this.user_service.getById(sessionStorage.getItem("user_id")).subscribe(data =>{
      let u = JSON.stringify(data)
      this.acquisti = JSON.parse(u).listaAcquisti;
      console.log("lista acquisti", JSON.parse(u).listaAcquisti)
      this.dialogAcq = true;
    })
  }

}

