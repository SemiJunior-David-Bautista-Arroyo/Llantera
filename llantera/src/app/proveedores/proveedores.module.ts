import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoProveedoresComponent } from './catalogo-proveedores/catalogo-proveedores.component';
import { EliminarprovComponent } from './eliminarprov/eliminarprov.component';
import { ActualizarprovComponent } from './actualizarprov/actualizarprov.component';
import { NuevoprovComponent } from './nuevoprov/nuevoprov.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CatalogoProveedoresComponent,
    EliminarprovComponent,
    ActualizarprovComponent,
    NuevoprovComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ProveedoresModule { }
