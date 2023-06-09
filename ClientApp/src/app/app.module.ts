import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutenticacionGuard } from './Seguridad/autenticacion.guard';
import { TokenInterceptor } from './Seguridad/token.interceptor';
import { HistoricoPedidosComponent } from './HistoricoPedidos/historicopedidos.component';
import { MisDatosComponent } from './modelos/MisDatos/misDatos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InicioComponent,
    ClienteComponent,
    LoginComponent,
    ProductoComponent,
    HistoricoPedidosComponent,
    MisDatosComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: InicioComponent, pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'login', component: LoginComponent },
      { path: 'producto', component: ProductoComponent, canActivate: [AutenticacionGuard] },
      { path: 'historicopedidos', component: HistoricoPedidosComponent, canActivate: [AutenticacionGuard] },
      { path: 'misDatos', component: MisDatosComponent, canActivate: [AutenticacionGuard] },
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
