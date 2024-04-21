import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Productos } from '../productos.modelo';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent {

  datosActualizar: Productos[] = [];
  dato: Productos = {
    _id: '',
    altura: 0,
    costo: 0,
    cve: '',
     descripcion : '',
     diametro_inf : 0,
     existencia : 0,
     fecha_ad : '',
     fecha_cr : '',
     fecha_f : '',
     foto : '',
     indices : {
       carga : 0,
       velocidad : '',
    },
    marca : '',
     medida : {
       ancho : 0,
       rin : 0,
       serie : 0,
    },
    modelo : '',
    origen : '',
    precio : 0,
    presionmax : 0,
     prooveedor_id : 0,
     resistencia : '',
     status : 'Activo',
     temporada : [],
     tipo : '',
     marcaId: ''
     
    };

  constructor(private productoServicio : ProductosService, private route: ActivatedRoute, private ruta: Router ){}

    productId: any | null = null;
  
  ngOnInit(): void{
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productoServicio.obtenerProductoPorId(this.productId)
        .subscribe(producto => {
          this.datosActualizar = producto;
          this.dato = producto[0] || {};
          console.log(this.productId);
          console.log(this.dato);
        }, error => {
          console.error('Error al obtener el producto: ', error);
        });
    }
      
  }

  actualizarproducto(){
    if (this.productId && this.dato) { 
      this.productoServicio.actualizarproducto(this.productId, this.dato)
        .subscribe(() => { 
          this.ruta.navigate(['/productosCatalogo'])
        }, error => {
          console.error('Error al actualizar producto', error);
        });
    } else {
      console.error('El ID del producto o los datos no están definidos');
    }
  }


}
