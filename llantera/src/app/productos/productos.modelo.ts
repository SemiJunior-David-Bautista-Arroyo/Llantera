export interface Productos{
    _id: string;
    altura: number;
    costo: number;
    cve: string;
     descripcion : string;
     diametro_inf : number;
     existencia : number;
     fecha_ad : string;
     fecha_cr : string;
     fecha_f : string;
     foto : string;
     indices : {
       carga : number;
       velocidad : string;
    };
     marca : string;
     medida : {
       ancho : number;
       rin : number;
       serie : number;
    };
     modelo : string;
     origen : string;
     precio : number;
     presionmax : number;
     prooveedor_id : number;
     resistencia : string;
     status : string;
     temporada : string[];
     tipo : string;
     marcaId: string;
  }