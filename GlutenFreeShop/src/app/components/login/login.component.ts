import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String='';
  password:String='';

  nuovoUtente: boolean=true;

  sign_username:String='';
  sign_password:String='';
  sign_firstname:String='';
  sign_lastname:String='';
  sign_address:String='';
  sign_convenzionato: boolean=false;

  //constructor(private userService: UserService) { }

  ngOnInit() {}

  login(){
    console.log("username:", this.username, "password:", this.password);
    //this.userService.login(this.username, this.password);

    // if(ok login){
    //   redirect --> home loggato
    // }
  }

  signin(){
    console.log("username:", this.sign_username, "password:", this.sign_password);
    //this.userService.signin(this.sign_username, this.sign_password, this.sign_firstname, this.sign_lastname, this.sign_address, this.sign_convenzionato);

     // if(ok registrazione){
    //   redirect --> home loggato
    // }
  }

}
