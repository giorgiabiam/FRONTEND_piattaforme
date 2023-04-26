export class Utente{
  //ID: number;
  username: String;
  password: String;
  nome: String;
  cognome: String;
  indirizzo: String;
  convenzionato: boolean;
  saldo: DoubleRange;
  listaAcquisti: any;

  constructor(username: string, password:string, nome:string, cognome:string, indirizzo:string,
    convenzionato: boolean, saldo: DoubleRange){
      this.username=username;
      this.password=password;
      this.nome=nome;
      this.cognome=cognome;
      this.indirizzo=indirizzo;
      this.convenzionato=convenzionato;
      this.saldo=saldo;
  }
}
