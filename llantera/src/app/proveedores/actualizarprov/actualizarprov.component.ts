import { Component } from '@angular/core';
import { Proveedores } from '../proveedores.modelo';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizarprov',
  templateUrl: './actualizarprov.component.html',
  styleUrls: ['./actualizarprov.component.css']
})
export class ActualizarprovComponent {
  datosActualizar: Proveedores[]=[]
  dato: Proveedores={
    _id : '',
    id: 0,
    nombre_proveedor : '',
    telefono: '',
    Locacion: {
        ciudad : '',
    },
  }

  constructor(private servProv: ProveedoresService, private route: ActivatedRoute, private ruta: Router){}
  
  provID: any | null = null;

  ngOnInit():void {
    this.provID = this.route.snapshot.paramMap.get('id');
    if (this.provID){
      this.servProv.obtenerProveporId(this.provID)
      .subscribe(prov =>{
        this.datosActualizar = prov
        this.dato = prov[0] || {};
        console.log(this.provID);
        console.log(this.dato);
      }, error =>{
        console.error('Error al obtener el producto:', error);
      });
    }
  }


  actualizarprove(){
    if (this.provID && this.dato){
      this.servProv.actualizarprov(this.provID, this.dato)
      .subscribe(()=>{
        this.ruta.navigate(['/proveedoresCatalogo'])
      }, error =>{
        console.error('Error al actualizar marca', error);
      });
    }else{
      console.error('El ID del proveedor o los datos no están definidos');
    }
  }

}
