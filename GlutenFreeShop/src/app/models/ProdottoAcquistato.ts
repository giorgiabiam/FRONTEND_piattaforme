import { Prodotto } from "./Prodotto";

export class ProdottoAcquistato{
  codice:number
  qtaAcquistata:number
  prodottoReale:Prodotto


  constructor(codice:number, prodotto:Prodotto, n:number){
    this.prodottoReale= prodotto
    this.qtaAcquistata = n
    this.codice = codice
  }
}
