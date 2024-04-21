import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoProductoComponent } from './productos/nuevo-producto/nuevo-producto.component';
import { BuscarProductosComponent } from './productos/buscar-productos/buscar-productos.component';
import { CatalogoProductosComponent } from './productos/catalogo-productos/catalogo-productos.component';
import { CatalogoProveedoresComponent } from './proveedores/catalogo-proveedores/catalogo-proveedores.component';
import { CatalogoMarcasComponent } from './marcas/catalogo-marcas/catalogo-marcas.component';
import { EliminarComponent } from './productos/eliminar/eliminar.component';
import { ActualizarComponent } from './productos/actualizar/actualizar.component';
import { EliminarprovComponent } from './proveedores/eliminarprov/eliminarprov.component';
import { ActualizarprovComponent } from './proveedores/actualizarprov/actualizarprov.component';
import { EliminarmarcaComponent } from './marcas/eliminarmarca/eliminarmarca.component';
import { ActualizarmarcaComponent } from './marcas/actualizarmarca/actualizarmarca.component';
import { NuevamarcaComponent } from './marcas/nuevamarca/nuevamarca.component';
import { NuevoprovComponent } from './proveedores/nuevoprov/nuevoprov.component';



const routes: Routes = [
  // PRODUCTOS
  {path : 'productosCatalogo', component: CatalogoProductosComponent},
  {path : 'productosNuevo', component: NuevoProductoComponent},
  {path : 'productosBuscar', component: BuscarProductosComponent},
  {path: 'productoseliminar/:id', component: EliminarComponent},
  {path: 'prodActualizar/:id', component: ActualizarComponent},
  // PROVEEDORES
  {path : 'proveedoresCatalogo', component: CatalogoProveedoresComponent},
  {path: 'provNuevo', component: NuevoprovComponent},
  {path: 'proveliminar/:id', component: EliminarprovComponent },
  {path: 'provactualizar/:id', component: ActualizarprovComponent},
  // Marcas
  {path : 'marcasCatalogo', component: CatalogoMarcasComponent },
  {path: 'marcaseliminar/:id', component: EliminarmarcaComponent},
  {path: 'marcasactualizar/:id', component: ActualizarmarcaComponent},
  {path: 'marcanueva', component: NuevamarcaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
