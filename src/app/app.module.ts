import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";


import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';

//Componentes
import { CancionesComponent } from './canciones/canciones.component';

//Servicios
import { CancionesService } from './providers/canciones.service';


@NgModule({
  declarations: [
    AppComponent,
    CancionesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CancionesService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
