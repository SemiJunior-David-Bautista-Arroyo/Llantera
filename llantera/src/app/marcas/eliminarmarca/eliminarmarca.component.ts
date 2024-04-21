import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcasService } from 'src/app/servicios/marcas.service';

@Component({
  selector: 'app-eliminarmarca',
  templateUrl: './eliminarmarca.component.html',
  styleUrls: ['./eliminarmarca.component.css']
})
export class EliminarmarcaComponent {
  marcaID: string | null = null;

  constructor(private ruta: Router,
      private router: ActivatedRoute,
      private serviciomarca: MarcasService){}

    ngOnInit(): void{
      this.marcaID = this.router.snapshot.paramMap.get('id');
    console.log(this.marcaID);
    this.eliminar();
    }
    messageErr : any;

    eliminar(){
      try{
      this.serviciomarca.eliminar_marca(this.marcaID)
      .subscribe(data =>{
        console.log(data);})
        alert('Marca eliminada');
        this.ruta.navigate(['/marcasCatalogo'])
      }
      catch(error: any){
        this.messageErr = error.error.message;
      }
    }

}
