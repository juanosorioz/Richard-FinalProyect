export class Factura{

    _id?: number;
    tipocliente: string;
    nombre: string;
    telefono: number;
    direccion: string;
    identificacion: number;

    constructor(tipocliente: string,nombre: string, telefono: number, direccion: string,identificacion: number){
        this.tipocliente=tipocliente;
        this.nombre=nombre;
        this.telefono= telefono;
        this.direccion= direccion;
        this.identificacion=identificacion;
    }
}