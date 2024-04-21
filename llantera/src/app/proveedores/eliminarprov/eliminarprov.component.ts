import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-eliminarprov',
  templateUrl: './eliminarprov.component.html',
  styleUrls: ['./eliminarprov.component.css']
})
export class EliminarprovComponent {
  provId: string | null = null;

  constructor(private ruta: Router, private router: ActivatedRoute,
    private serviProv: ProveedoresService){}

    ngOnInit():void{
      this.provId = this.router.snapshot.paramMap.get('id');
      console.log(this.provId);
      this.eliminar();
    }

    messageErr: any;

    eliminar(){
      try{
        this.serviProv.eliminar_prov(this.provId)
        .subscribe(data =>{
          console.log(data)})
          alert("proveedors eliminado")
          this.ruta.navigate(['/proveedoresCatalogo'])
      }
      catch(error: any){
        this.messageErr = error.error.message;
      }
    }



  }
