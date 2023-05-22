import { Prodotto } from "./Prodotto"

export class Acquisto{
  dataAcquisto:String
  listaProdotti: Prodotto[]
  totale:number

  constructor(dataAcquisto:String, listaProdotti: Prodotto[], totale:number){
    this.dataAcquisto=dataAcquisto
    this.listaProdotti=listaProdotti
    this.totale = totale
  }
}
