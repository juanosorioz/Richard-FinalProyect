import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListaProductoComponent } from './components/lista-producto/lista-producto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearAlquilerComponent } from './components/crear-alquiler/crear-alquiler.component';
import { SessionComponent } from './components/session/session.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListaAlquilerComponent } from './components/lista-alquiler/lista-alquiler.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { ListaFacturaComponent } from './components/lista-factura/lista-factura.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [AppComponent,CrearProductoComponent,ListaProductoComponent,InicioComponent,CrearAlquilerComponent,SessionComponent,ListaAlquilerComponent,CrearFacturaComponent,ListaFacturaComponent,NavbarComponent],
  imports: [BrowserModule,AppRoutingModule,ReactiveFormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
