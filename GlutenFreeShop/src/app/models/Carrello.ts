import { ItemCarrello } from "./ItemCarrello";
import { Prodotto } from "./Prodotto"

export class Carrello{
  totale:number;
  lista:ItemCarrello[]

  constructor(){
    this.totale = 0;
    this.lista = []
  }

}
