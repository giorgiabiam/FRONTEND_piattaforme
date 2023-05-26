import { Prodotto } from "./Prodotto";

export class ItemCarrello{
  prodotto:Prodotto
  qta_acquist:number

  constructor(prodotto:Prodotto, n:number){
    this.prodotto= prodotto
    this.qta_acquist = n
  }
}
