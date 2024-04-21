import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavegacionModule } from './navegacion/navegacion.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';

import {HttpClientModule} from '@angular/common/http';
import { CatalogoProductosComponent } from './productos/catalogo-productos/catalogo-productos.component';
import { MarcasModule } from './marcas/marcas.module';


@NgModule({
  declarations: [
    AppComponent,
    CatalogoProductosComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavegacionModule,
    ProductosModule,
    ProveedoresModule,
    HttpClientModule,
    MarcasModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
