import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { AreaPersonaleComponent } from './components/area-personale/area-personale.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { PageUtentiComponent } from './components/admin/page-utenti/page-utenti.component';
import { PageAcquistiComponent } from './components/admin/page-acquisti/page-acquisti.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children:[{ path: 'login', component: AreaPersonaleComponent },
              { path: 'carrello', component: CarrelloComponent },
              { path: '', component: ProdottiComponent }]
  },
  { path: 'admin', component: HomeAdminComponent,
    children:[{ path: 'utenti', component: PageUtentiComponent }, { path: 'acquisti', component: PageAcquistiComponent },
              { path: 'logout', redirectTo: '/login', }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
