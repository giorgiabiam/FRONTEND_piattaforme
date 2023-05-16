export class Prodotto{

  codice : number
  nome:string
  qta:number
  img:string
  descrizione:string
  prezzo:number

  constructor(codice : number , nome:string, qta:number,prezzo:number, descrizione:string, img:string){
    this.codice = codice
    this.nome = nome
    this.qta = qta
    this.img = img
    this.prezzo = prezzo
    this.descrizione = descrizione
  }

}
