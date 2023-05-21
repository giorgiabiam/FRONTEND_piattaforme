import { Prodotto } from "./Prodotto"

export class Carrello{
  n:number
  listaProdotti:Prodotto[]

  constructor(){
    this.n = 0;
    this.listaProdotti = []
  }

}
