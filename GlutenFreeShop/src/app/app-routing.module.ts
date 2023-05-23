import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { AreaPersonaleComponent } from './components/area-personale/area-personale.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { DettagliOrdineComponent } from './components/dettagli-ordine/dettagli-ordine.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children:[{ path: 'login', component: AreaPersonaleComponent },
              { path: 'carrello', component: CarrelloComponent },
              { path: 'dettagli/:id', component: DettagliOrdineComponent },
              { path: '', component: ProdottiComponent }] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
