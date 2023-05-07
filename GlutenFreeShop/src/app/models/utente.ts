export class Utente{
  //ID: number;
  username: String;
  password: String;
  nome: String;
  cognome: String;
  indirizzo: String;
  convenzionato: boolean;

  constructor(username: String, password:String, nome:String, cognome:String, indirizzo:String,
    convenzionato: boolean){
      this.username=username;
      this.password=password;
      this.nome=nome;
      this.cognome=cognome;
      this.indirizzo=indirizzo;
      this.convenzionato=convenzionato;
       //il saldo è gestito nel backend
  }
}
