import { Component, OnInit } from '@angular/core';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerServiceService } from 'src/app/services/alquiler-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-alquiler',
  templateUrl: './lista-alquiler.component.html',
  styleUrls: ['./lista-alquiler.component.css']
})
export class ListaAlquilerComponent implements OnInit {

  listaAlquiler: Alquiler[] = [];

  constructor(private _alquilerService: AlquilerServiceService) { }

  ngOnInit(): void {
    this.obtenerAlquilers()
  }

  obtenerAlquilers(){
    this._alquilerService.getAlquilers().subscribe(data =>{
      console.log(data);
      this.listaAlquiler = data;
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

  eliminarAlquiler(id: any){
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
        this._alquilerService.eliminarAlquiler(id).subscribe(data=>{
          this.obtenerAlquilers();
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
