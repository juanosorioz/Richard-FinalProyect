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
import { AuthGuard } from './guards/auth.guard';
import { SessionGuard } from './guards/session.guard';
import { AdminComponent } from './components/admin/admin.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [{ path:'', component: SessionComponent},{ path:'inicio', component: InicioComponent, canActivate: [AuthGuard]},{ path:'session', component: SessionComponent, canActivate: [SessionGuard]},{ path:'lista-producto', component: ListaProductoComponent},{ path:'crear-producto', component: CrearProductoComponent},{ path:'editar-producto/:id', component: CrearProductoComponent},{ path:'lista-alquiler', component: ListaAlquilerComponent},{ path:'crear-alquiler',component: CrearAlquilerComponent},{ path:'editar-alquiler/:id', component: CrearAlquilerComponent},{ path:'crear-factura', component: CrearFacturaComponent},{ path:'editar-factura/:id', component: CrearFacturaComponent},{ path:'lista-factura',component: ListaFacturaComponent},{path:'admin', component: AdminComponent,canActivate: [RoleGuard], data: {expectedRole: 'admin'}},{ path:'**', pathMatch:'full', redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
