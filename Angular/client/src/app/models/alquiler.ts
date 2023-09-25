export class Alquiler{

    _id?: number;
    codigofactura: string;
    codigoherramienta: string;
    diasprestamo: number;
    deposito: number;

    constructor(codigofactura: string,codigoherramienta: string, diasprestamo: number, deposito: number){
        this.codigofactura=codigofactura;
        this.codigoherramienta=codigoherramienta;
        this.diasprestamo= diasprestamo;
        this.deposito= deposito;
    }
}