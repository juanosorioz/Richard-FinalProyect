import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerServiceService } from 'src/app/services/alquiler-service.service';

@Component({
  selector: 'app-crear-alquiler',
  templateUrl: './crear-alquiler.component.html',
  styleUrls: ['./crear-alquiler.component.css']
})
export class CrearAlquilerComponent implements OnInit {

  AlquilerForm : FormGroup;
  titulo = 'Crear Alquiler';
  id: string | null;
  constructor(private fb: FormBuilder,
              private _alquilerService: AlquilerServiceService,
              private router: Router,
              private aRoute : ActivatedRoute) {
    this.AlquilerForm = this.fb.group({
      tipocliente: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      codigoherramienta: ['', Validators.required],
      diasprestamo: ['', Validators.required],
      deposito: ['', Validators.required],
      total: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
   }


  ngOnInit(): void {
    this.esEditar()
  }

  agregarAlquiler(){
    console.log(this.AlquilerForm);

    const ALQUILER : Alquiler ={
      tipocliente : this.AlquilerForm.get('tipocliente')?.value,
      nombre : this.AlquilerForm.get('nombre')?.value,
      telefono : this.AlquilerForm.get('telefono')?.value,
      direccion : this.AlquilerForm.get('direccion')?.value,
      codigoherramienta : this.AlquilerForm.get('codigoherramienta')?.value,
      diasprestamo : this.AlquilerForm.get('diasprestamo')?.value,
      deposito : this.AlquilerForm.get('deposito')?.value,
      total : this.AlquilerForm.get('total')?.value
    }

    if(this.id !== null)
    {
      //editar
      this._alquilerService.editarAlquiler(this.id, ALQUILER).subscribe(data =>{
        console.log("actualizado");
        this.router.navigate(['/lista-alquiler'])
      })
    }else{
      //crear
      console.log(ALQUILER);
      this._alquilerService.guardarAlquiler(ALQUILER).subscribe(data =>{
        console.log('Guardado');
        this.router.navigate(['/lista-alquiler'])
      },error =>{
        console.log(error);
        this.AlquilerForm.reset();
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Alquiler"
      this._alquilerService.obtenerAlquiler(this.id).subscribe(data=>{
        this.AlquilerForm.setValue({
          tipocliente: data.tipocliente,
          nombre: data.nombre,
          telefono: data.telefono,
          direccion: data.direccion,
          codigoherramienta: data.codigoherramienta,
          diasprestamo: data.diasprestamo,
          deposito: data.deposito,
          total: data.total
        })
      })
    }
  }
}

