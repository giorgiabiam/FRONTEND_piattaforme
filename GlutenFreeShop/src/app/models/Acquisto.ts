import { Prodotto } from "./Prodotto"
import { Utente } from "./Utente"

export class Acquisto{
  id:number
  dataAcquisto:String
  listaProdotti: Prodotto[]
  tot:number
  acquirente:Utente

  constructor(dataAcquisto:String, listaProdotti: Prodotto[], tot:number, id:number, acquirente:Utente){
    this.dataAcquisto=dataAcquisto
    this.listaProdotti=listaProdotti
    this.tot = tot
    this.id = id
    this.acquirente = acquirente
  }
}
