import { Prodotto } from "./Prodotto"

export class Carrello{
  n:number;
  listaProdottiReal:Prodotto[];
  totale:number;

  map:Map<number, number>;

  constructor(){
    this.n = 0;
    this.listaProdottiReal = [];
    this.totale = 0;

    this.map=new Map<number, number>();
  }

}
