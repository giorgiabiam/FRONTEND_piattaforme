import { Prodotto } from "./Prodotto"

export class Carrello{
  n:number
  lista_prodotti:Prodotto[]

  constructor(){
    this.n = 0;
    this.lista_prodotti = []
  }

}
