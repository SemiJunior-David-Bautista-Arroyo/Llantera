import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoMarcasComponent } from './catalogo-marcas/catalogo-marcas.component';
import { EliminarmarcaComponent } from './eliminarmarca/eliminarmarca.component';
import { ActualizarmarcaComponent } from './actualizarmarca/actualizarmarca.component';
import { NuevamarcaComponent } from './nuevamarca/nuevamarca.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CatalogoMarcasComponent,
    EliminarmarcaComponent,
    ActualizarmarcaComponent,
    NuevamarcaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CatalogoMarcasComponent
  ]
})
export class MarcasModule { }
