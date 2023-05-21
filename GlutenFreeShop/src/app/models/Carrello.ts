import { Prodotto } from "./Prodotto"

export class Carrello{
  n:number
  listaProdotti:Prodotto[]

  listaProdottiReal:Prodotto[]
  totale:number


  constructor(){
    this.n = 0;
    this.listaProdotti = []

    this.listaProdottiReal = []
    this.totale = 0
  }

}
