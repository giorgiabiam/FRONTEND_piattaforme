import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';

import { HomeService } from './services/home-service.service';
import { UserService } from './services/user-service.service';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { AreaPersonaleComponent } from './components/area-personale/area-personale.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProdottiComponent,
    CarrelloComponent,
    AreaPersonaleComponent
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
    MatBadgeModule
  ],
  providers: [HomeService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
