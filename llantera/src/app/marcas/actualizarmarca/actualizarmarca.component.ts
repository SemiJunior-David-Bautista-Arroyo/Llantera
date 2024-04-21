import { Component } from '@angular/core';
import { Marcas } from '../marcas.modelo';
import { MarcasService } from 'src/app/servicios/marcas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizarmarca',
  templateUrl: './actualizarmarca.component.html',
  styleUrls: ['./actualizarmarca.component.css']
})
export class ActualizarmarcaComponent {
  

  dato : Marcas ={  
  _id: '',
  marca: '',
  marcaId: 0,
  imagen: '',
  sitio_web: '',
  anio_fundacion: 0
  }

  constructor(private servicioMarca : MarcasService, private route: ActivatedRoute, private ruta: Router ){}

  marcaID: any | null = null;

  ngOnInit(): void{
    this.marcaID = this.route.snapshot.paramMap.get('id');
    if (this.marcaID) {
      this.servicioMarca.obtenerMarcaporId(this.marcaID)
        .subscribe(marca => {
          this.dato = marca;
          console.log(this.marcaID);
          console.log(this.dato);
        }, error => {
          console.error('Error al obtener el producto: ', error);
        });
    }

  }

  actualizarmarca(){
    if (this.marcaID && this.dato) { 
      this.servicioMarca.actualizarMarca(this.marcaID, this.dato)
        .subscribe(() => { 
          this.ruta.navigate(['/marcasCatalogo'])
        }, error => {
          console.error('Error al actualizar marca', error);
        });
    } else {
      console.error('El ID de la marca o los datos no están definidos');
    }
  }


}
