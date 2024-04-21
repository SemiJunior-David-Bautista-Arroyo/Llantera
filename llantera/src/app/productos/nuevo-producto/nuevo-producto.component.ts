import { Component } from '@angular/core';
import { Marcas } from 'src/app/marcas/marcas.modelo';
import { MarcasService } from 'src/app/servicios/marcas.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { Productos } from '../productos.modelo';
import { Categoria } from 'src/app/categoria/categoria.modelo';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { Proveedores } from 'src/app/proveedores/proveedores.modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent {
  listaMarcas: Marcas[]=[];
  listaProvee: Proveedores[]=[];
  listaTipo : Set<String>= new Set<string>();
  listaModelo: Set<String>= new Set<string>();
  listaResistencia: Set<String>= new Set<string>();
  listaPais : Set<string> = new Set<string>();

  temporadas : string[] = ['Verano', 'Primavera', 'Otoño', 'Invierno'];
  temporadaSeleccionada: {[key: string]: boolean} = {}

  constructor(private servicioMarcas: MarcasService, private ServicioProd: ProductosService,
     private ServicioProv: ProveedoresService, private ruta: Router){}

  ngOnInit(){
    this.servicioMarcas.obtenerMarcas()
    .subscribe(data =>{
      console.log(data);
      this.listaMarcas = data;
    });
    this.ServicioProv.obtenerProveedores()
    .subscribe(data=>{
      this.listaProvee = data;
    });
    
    this.ServicioProd.obtenerProductos()
    .subscribe(data => {
      
      const tipos = data.map(item => item.tipo);
      const modelos = data.map(item => item.modelo);
      const resitencias = data.map(item => item.resistencia);
      const paises = data.map(item => item.origen);
      
      tipos.forEach(tipo => this.listaTipo.add(tipo));
      modelos.forEach(modelo => this.listaModelo.add(modelo));
      resitencias.forEach(res => this.listaResistencia.add(res));
      paises.forEach(pais => this.listaPais.add(pais));
    });
  }
  
  
  miCategoria: Categoria ={
    nombCat: '',
    descCat:''
    }

  miProd: Productos= {
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
     
    }
    
    //INICIAN LOS GETS PARA MOSTRAR EN LOS DROPDOWNS
  get_id_marca(Id: any){
    this.miProd.marcaId = Id
    console.log(this.miProd.marcaId)
  }
  get_prov(Id: any){
    this.miProd.prooveedor_id = Id
  }
  get_tipos(){
    this.miProd.tipo;
  }
  get_modelo(){
    this.miProd.modelo;
  }
  get_res(){
    this.miProd.resistencia;
  }
  get_pais(){
    this.miProd.origen;
  }

  imagen1 : any;
  
  convertir_B64(event: any){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.miProd.foto = reader.result as string; // Guardar la imagen en base64
      };
      reader.readAsDataURL(file); 
    }
  }

  new_product(){

    this.miProd.temporada = this.temporadas.filter(temporada =>
      this.temporadaSeleccionada[temporada]
    );
    this.ServicioProd.new_product(this.miProd)
    .subscribe((result) => {
      console.log(result);
      if (result){
        alert("Documento agregado correctamente")
        this.ruta.navigate(['/productosCatalogo'])
      }
    },(error) => {
      console.error(error);
      alert("Se generó uno error, Documento no insertado")
    });
  }

}
