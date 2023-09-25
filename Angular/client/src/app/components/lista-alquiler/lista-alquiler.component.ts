import { Component, OnInit } from '@angular/core';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerServiceService } from 'src/app/services/alquiler-service.service';

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
      console.log(error);
    })
  }

  eliminarAlquiler(id: any){
    this._alquilerService.eliminarAlquiler(id).subscribe(data=>{
      console.log('Eliminado');
      this.obtenerAlquilers();
    },error =>{
      console.log(error);
    })
  }
}