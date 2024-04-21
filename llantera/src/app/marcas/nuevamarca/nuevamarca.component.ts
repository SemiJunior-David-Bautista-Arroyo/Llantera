import { Component } from '@angular/core';
import { Marcas } from '../marcas.modelo';
import { MarcasService } from 'src/app/servicios/marcas.service';
import { Router } from '@angular/router';
import { Observable, of, catchError, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevamarca',
  templateUrl: './nuevamarca.component.html',
  styleUrls: ['./nuevamarca.component.css']
})
export class NuevamarcaComponent {
  
  constructor(private ServicioMarca: MarcasService, private ruta: Router, private http: HttpClient){}

  miMarca: Marcas = {
    _id: '',
    marcaId: 0,
    marca: '',
    imagen: '',
    sitio_web: '',
    anio_fundacion: 0

  }

  convertir_B64(event: any){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.miMarca.imagen = reader.result as string; // Guardar la imagen en base64
      };
      reader.readAsDataURL(file); 
    }
  }

  new_marca(){
    this.ServicioMarca.new_marca(this.miMarca)
    .subscribe((result)=>{
      console.log(result);
      if(result){
        alert("Documento insertado correctamente");
        this.ruta.navigate(["/marcasCatalogo"])
      }
    },(error)=>{
      console.error(error);
      alert("Se generó un error, documento no insertado")
    })
  }


  

}
