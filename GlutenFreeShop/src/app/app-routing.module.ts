import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { AreaPersonaleComponent } from './components/area-personale/area-personale.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AreaPersonaleComponent },
  { path: 'carrello', component: CarrelloComponent }  // il carrello sta meglio nell'area personale
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
