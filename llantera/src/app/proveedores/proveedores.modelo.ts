export interface Proveedores{
    _id : string;
    id: number;
    nombre_proveedor : string;
    telefono: string;
    Locacion: {
        ciudad : string;
    };
}