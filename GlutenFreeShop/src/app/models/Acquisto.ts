import { Prodotto } from "./Prodotto"

export class Acquisto{
  id:number
  dataAcquisto:String
  listaProdotti: Prodotto[]
  tot:number

  constructor(dataAcquisto:String, listaProdotti: Prodotto[], tot:number, id:number){
    this.dataAcquisto=dataAcquisto
    this.listaProdotti=listaProdotti
    this.tot = tot
    this.id = id
  }
}
