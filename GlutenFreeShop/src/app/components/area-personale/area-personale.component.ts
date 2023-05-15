import { Component, Output, EventEmitter } from '@angular/core';
import { Utente } from 'src/app/models/Utente';
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

  constructor(private user_service: UserService) { }

  ngOnInit() {}

  @Output() emitter : EventEmitter<boolean> = new EventEmitter();


  login(){
    this.user_service.login(this.username, this.password).subscribe(
      data =>{
        console.log("LOGIN----", data)

        if(data==null){
          this.login_ok = false;
          this.loggato = false;
        }
        else{
          //login andato a buon fine
          this.login_ok = true;
          this.loggato = true;

          this.utente = JSON.parse(JSON.stringify(data));

          console.log("id", this.utente.id)
          sessionStorage.setItem("user_id", this.utente.id.toString());
          //carrello?

          this.emitter.emit(this.loggato); //TODO
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
  }

  showPreferiti(){
    let data = this.utente.preferiti();
    console.log("utente", this.utente);
    console.log("preferiti", data);
    console.log("user id nei preferiti", sessionStorage.getItem("user_id"));

    this.dialog = true;
    // this.user_service.getPreferiti(sessionStorage.getItem("user_id")).subscribe(data=>{
      // console.log("preferiti", data)
    // })
  }

}

