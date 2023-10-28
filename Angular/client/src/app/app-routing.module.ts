import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './components/lista-producto/lista-producto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CrearAlquilerComponent } from './components/crear-alquiler/crear-alquiler.component';
import { SessionComponent } from './components/session/session.component';
import { ListaAlquilerComponent } from './components/lista-alquiler/lista-alquiler.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { ListaFacturaComponent } from './components/lista-factura/lista-factura.component';

const routes: Routes = [{ path:'', component: SessionComponent},{ path:'inicio', component: InicioComponent},{ path:'session', component: SessionComponent},{ path:'lista-producto', component: ListaProductoComponent},{ path:'crear-producto', component: CrearProductoComponent},{ path:'editar-producto/:id', component: CrearProductoComponent},{ path:'lista-alquiler', component: ListaAlquilerComponent},{ path:'crear-alquiler',component: CrearAlquilerComponent},{ path:'editar-alquiler/:id', component: CrearAlquilerComponent},{ path:'crear-factura', component: CrearFacturaComponent},{ path:'editar-factura/:id', component: CrearFacturaComponent},{ path:'lista-factura',component: ListaFacturaComponent},{ path:'**', pathMatch:'full', redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
