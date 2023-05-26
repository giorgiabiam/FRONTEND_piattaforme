import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { AreaPersonaleComponent } from './components/area-personale/area-personale.component';

import { HomeService } from './services/home-service.service';
import { UserService } from './services/user-service.service';
import { AuthInterceptor } from './_helpers/AuthInterceptor';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { DettagliOrdineComponent } from './components/dettagli-ordine/dettagli-ordine.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProdottiComponent,
    CarrelloComponent,
    AreaPersonaleComponent,
    DettagliOrdineComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [HomeService, UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
