import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Acquisto } from 'src/app/models/Acquisto';
import { Utente } from 'src/app/models/Utente';
import { HomeService } from 'src/app/services/home-service.service';
import { UserService } from 'src/app/services/user-service.service';
import jwt_decode from "jwt-decode";


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

  login_ok: any;
  nuovoUtente: boolean=true;
  hide: boolean= true;
  loggato : boolean = false;   //questo lo dovrei mandare al parent
  dialog : boolean = false
  messaggio_signin = false

  sign_username:String='';
  sign_password:String='';
  sign_firstname:String='';
  sign_lastname:String='';
  sign_address:String='';
  signin_ok: any;

  username_control = new FormControl('', [Validators.required, Validators.minLength(1)]);
  password_control = new FormControl('', [Validators.required, Validators.minLength(4)]);
  first_name_control = new FormControl('', [Validators.required]);
  last_name_control = new FormControl('', [Validators.required]);
  address_control = new FormControl('', [Validators.required]);


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
    if(this.username_control.errors || this.username.trim().length == 0 || this.password_control.errors){
      // controllo sui form per vedere se tutti i campi sono validi prima di procedere
      console.log("errore login")
    }
    else{
      this.user_service.login(this.username, this.password).subscribe({
          next:data =>{

            console.log("LOGIN----", data)  //data nel back è di tipo JwtResponse che ha (String jwt, int idUtente)
            let response = JSON.parse(JSON.stringify(data));
            const jwt = response.token
            const idutente = response.idutente
            sessionStorage.setItem('user_id', idutente);
            sessionStorage.setItem('token', jwt);

            let decoded_jwt: string | any = jwt_decode(!!jwt? jwt :'')
            console.log("decoded", decoded_jwt)

            if( decoded_jwt.ruolo == "ADMIN"){
              this.router.navigate(['/admin'])
            }
            else{
              this.login_ok = true;
              this.loggato = true;
              this.messaggio_signin = false;

              this.getUser();
            }
          },

          error:err =>{
            this.login_ok = false;
            this.loggato = false;
            console.log("errore login", err);
          }
        });
    }


  }

  getUser(){
    let id = sessionStorage.getItem("user_id")

    this.user_service.getById(id).subscribe(data=>{
      console.log("GET USER", data)
      this.utente = JSON.parse(JSON.stringify(data));
    })
  }

  getAcquisti(id:string|null){
    this.user_service.getAcquisti(id).subscribe(data=>{
      console.log("acquisti dell'utente ",id, ": ", data)
      let lista:Acquisto[] = []

      for(let a of JSON.parse(JSON.stringify(data))){
        console.log("A: ", a)
        let acquisto:Acquisto = new Acquisto(a.dataAcquisto, a.listaProdotti, a.tot, a.id, this.utente)
        lista.push(acquisto)
      }
      this.acquisti = lista
      console.log("this acquisti ", this.acquisti)
    });
  }

  signin(){
    if(this.username_control.errors || this.sign_username.trim().length == 0 || this.password_control.errors
        || this.first_name_control.errors || this.last_name_control.errors || this.address_control.errors){
      //faccio un controllo sui form control per vedere se tutti i campi sono validi prima di procedere
      console.log("errore signin control form")
    }
    else{
      let newUtente = new Utente( this.sign_username.trim().toLowerCase(), this.sign_password.trim(), this.sign_firstname, this.sign_lastname,
                            this.sign_address, "USER");

      console.log("nuovo utente----", newUtente)

      this.user_service.signin(newUtente).subscribe({
        next:data=>{
          this.signin_ok = true;

          let response = JSON.parse(JSON.stringify(data));
          console.log("SIGNIN----", response)

          this.nuovoUtente = false
          this.messaggio_signin = true
        },
        error:error=>{
          this.signin_ok = false;
          console.log("errore signin", error)
        }

      });
    }


  }

  logout(){
    sessionStorage.clear();
    window.location.reload();
    this.home_service.svuota_carrello().subscribe(data=>{
      console.log("carrello al logout", data)
    })
  }

  showCarrello(){
    this.router.navigate(['carrello'])
  }

  showAcquisti(){
    let id = sessionStorage.getItem("user_id")
    this.getAcquisti(id);
    this.dialog = true;
  }

}

