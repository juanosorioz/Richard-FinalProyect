import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturaServiceService } from 'src/app/services/factura-service.service';

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.css']
})
export class ListaFacturaComponent implements OnInit {

  listaFactura: Factura[] = [];

  constructor(private _facturaService: FacturaServiceService) { }

  ngOnInit(): void {
    this.obtenerFacturas()
  }

  obtenerFacturas(){
    this._facturaService.getFacturas().subscribe(data =>{
      console.log(data);
      this.listaFactura = data;
    }, error =>{
      console.log(error);
    })
  }

  eliminarFactura(id: any){
    this._facturaService.eliminarFactura(id).subscribe(data=>{
      console.log('Eliminado');
      this.obtenerFacturas();
    },error =>{
      console.log(error);
    })
  }
}