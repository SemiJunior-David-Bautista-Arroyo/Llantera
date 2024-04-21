import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { BuscarProductosComponent } from './buscar-productos/buscar-productos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EliminarComponent } from './eliminar/eliminar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';


@NgModule({
  declarations: [
    NuevoProductoComponent,
    BuscarProductosComponent,
    EliminarComponent,
    ActualizarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule

  ],
  exports:[
    NuevoProductoComponent,
    BuscarProductosComponent
  ]
  
})
export class ProductosModule { }
