export class Utente{
  //ID: number;
  username: String;
  password: String;
  nome: String;
  cognome: String;
  indirizzo: String;


  constructor(username: String, password:String, nome:String, cognome:String, indirizzo:String){
      this.username=username;
      this.password=password;
      this.nome=nome;
      this.cognome=cognome;
      this.indirizzo=indirizzo;

  }
}
