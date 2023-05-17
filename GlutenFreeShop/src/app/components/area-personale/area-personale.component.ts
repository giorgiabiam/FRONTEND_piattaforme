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

  utente : any;

  username:String='';
  password:String='';
  login_ok: boolean = false;


  nuovoUtente: boolean=true;
  hide: boolean= true;
  loggato : boolean = false;   //questo lo dovrei mandare al parent
  dialog : boolean = false;


  sign_username:String='';
  sign_password:String='';
  sign_firstname:String='';
  sign_lastname:String='';
  sign_address:String='';
  sign_convenzionato: boolean=false;
  signin_ok: boolean = false;


  preferiti=[];
  // carrello:Carrello;

  constructor(private user_service: UserService, private home_service: HomeService, private router:Router) { }

  ngOnInit() {
    console.log("area-personale, utente:", sessionStorage.getItem("user_id"))
    if(sessionStorage.getItem("user_id")==null){
      this.loggato = false
    }
    else{
      this.loggato = true
    }
  }

  login(){
    this.user_service.login(this.username, this.password).subscribe({
      next:data =>{        //login andato a buon fine

        console.log("LOGIN----", data)  //data nel back è di tipo JwtResponse che ha (String jwt, Utente u)
        this.login_ok = true;
        this.loggato = true;

        let response = JSON.parse(JSON.stringify(data));  //DA VERIFICARE
        console.log("RESPONSE", response)
        this.utente = response.utente
        const jwt = response.token

        console.log("id utente", this.utente.id)
        console.log("token", jwt)

        sessionStorage.setItem("user_id", this.utente.id.toString());
        sessionStorage.setItem("token", jwt);

      //reload page ?
      // window.location.reload();

      },
      error:err =>{
        this.login_ok = false;
        this.loggato = false;
        console.log("error", err);

        //TODO comunca error message
      }
    });
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

            this.utente = JSON.parse(JSON.stringify(data));
            sessionStorage.setItem("user_id", this.utente.id);
          }
        });
  }

  logout(){
    sessionStorage.clear();
    window.location.reload(); //TODO redirect a home
    this.router.navigate(['login'])
  }

  showPreferiti(){
    console.log("utente", this.utente);
    console.log("user id nei preferiti", sessionStorage.getItem("user_id"));

    this.user_service.get(sessionStorage.getItem("user_id")).subscribe(data =>{
      let u = JSON.stringify(data)
      this.preferiti = JSON.parse(u).preferiti;
      console.log("preferiti", JSON.parse(u).preferiti)
      this.dialog = true;
    })
  }

  showCarrello(){
    this.home_service.getCarrello().subscribe( data =>{
      console.log("carrello get", data);
    });
  }

}

