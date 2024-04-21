import { Component } from '@angular/core';
import { Marcas } from '../marcas.modelo';
import { MarcasService } from 'src/app/servicios/marcas.service';

@Component({
  selector: 'app-catalogo-marcas',
  templateUrl: './catalogo-marcas.component.html',
  styleUrls: ['./catalogo-marcas.component.css']
})
export class CatalogoMarcasComponent {
  listaMarcas: Marcas[]=[]

  constructor(private marcasService: MarcasService){}

  ngOnInit(): void{
    this.marcasService.obtenerMarcas()
    .subscribe(data =>{
      console.log(data);
      this.listaMarcas=data;
    });
  }

}
