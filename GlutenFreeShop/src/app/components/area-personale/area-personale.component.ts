import { Component } from '@angular/core';
import { Utente } from 'src/app/models/Utente';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css']
})
export class AreaPersonaleComponent {
  username:String='';
  password:String='';
  login_ok: boolean = false;


  nuovoUtente: boolean=true;
  hide: boolean= true;
  loggato : boolean = false;   //questo lo dovrei mandare al parent


  sign_username:String='';
  sign_password:String='';
  sign_firstname:String='';
  sign_lastname:String='';
  sign_address:String='';
  sign_convenzionato: boolean=false;
  signin_ok: boolean = false;

  constructor(private user_service: UserService) { }

  ngOnInit() {}


  login(){
    this.user_service.login(this.username, this.password).subscribe(
      data =>{  //data è l'utente che mi manda il backend
        console.log("LOGIN----", data)
        if(data==null){
          this.login_ok = false;
        }
        else{
          //login andato a buon fine
          this.login_ok = true;
          this.loggato = true;
        }
    });
  }

  signin(){
    let utente = new Utente( this.sign_username, this.sign_password, this.sign_firstname, this.sign_lastname,
                            this.sign_address, this.sign_convenzionato);

    this.user_service.signin(utente).subscribe(data=>{
          console.log("SIGNIN----", data)
          if(data==null){
            this.signin_ok = false;
          }
          else{
            //signin andato a buon fine
            this.signin_ok = true;
            this.loggato = true;
          }
        });

  }

}

