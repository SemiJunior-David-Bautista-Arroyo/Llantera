import { Component, OnInit } from '@angular/core';

import { Productos } from 'src/app/productos/productos.modelo';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.css']
})
export class CatalogoProductosComponent implements OnInit {

  listaProducto: Productos[]=[]
  

  constructor(private ProductoService: ProductosService){}

  ngOnInit(): void{
    this.ProductoService.obtenerProductos()
    .subscribe(data =>{
      console.log(data);
      this.listaProducto = data;
    });
  }

  

}
