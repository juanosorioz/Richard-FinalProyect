import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { FacturaServiceService } from 'src/app/services/factura-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-factura',
  templateUrl: './lista-factura.component.html',
  styleUrls: ['./lista-factura.component.css']
})
export class ListaFacturaComponent implements OnInit {

  listaFactura: Factura[] = [];
  titulo = "Crear Factura";

  constructor(private _facturaService: FacturaServiceService) { }

  ngOnInit(): void {
    this.obtenerFacturas()
  }

  obtenerFacturas(){
    this._facturaService.getFacturas().subscribe(data =>{
      console.log(data);
      this.listaFactura = data;
    }, error =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo Salio Mal, Revisa el error',
        footer: 'No se estan trayendo los datos'
      })
      console.log(error);
    })
  }

  eliminarFactura(id: any){
    Swal.fire({
      title: 'Estas Seguro De Eliminar?',
      text: "No puedes recuperar los datos! despues",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado',
          'Los Datos han sido borrados',
          'success'
        )
        this._facturaService.eliminarFactura(id).subscribe(data=>{
          this.obtenerFacturas();
        },error =>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo Salio Mal, Revisa el error',
            footer: 'No se elimino el dato'
          })
          console.log(error);
        })
      }
    })
  }
}
