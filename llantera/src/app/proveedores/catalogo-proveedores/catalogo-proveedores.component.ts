import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../proveedores.modelo';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-catalogo-proveedores',
  templateUrl: './catalogo-proveedores.component.html',
  styleUrls: ['./catalogo-proveedores.component.css']
})
export class CatalogoProveedoresComponent implements OnInit {
  listaProvs: Proveedores[]= []

  constructor(private ProveedorServices: ProveedoresService){}

  ngOnInit(): void {
    this.ProveedorServices.obtenerProveedores()
    .subscribe(data =>{
      console.log(data);
      this.listaProvs = data;
    })
  }

}
