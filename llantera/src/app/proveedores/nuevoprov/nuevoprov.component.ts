import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Proveedores } from '../proveedores.modelo';

@Component({
  selector: 'app-nuevoprov',
  templateUrl: './nuevoprov.component.html',
  styleUrls: ['./nuevoprov.component.css']
})
export class NuevoprovComponent {

  constructor(private servicioProv: ProveedoresService, private ruta: Router){}

  miprov: Proveedores ={
    _id : '',
    id: 0,
    nombre_proveedor : '',
    telefono: '',
    Locacion: {
        ciudad : ''
    }
  }

  new_prove(){
    this.servicioProv.new_prov(this.miprov)
    .subscribe((result) =>{
      console.log(result);
      if(result){
        alert("DOcumento agregado correctamente")
        this.ruta.navigate(['/proveedoresCatalogo'])
      }
    },(error)=>{
      console.error(error);
      alert('Se generó un error, Documento no insertado')
    });
  }

}
