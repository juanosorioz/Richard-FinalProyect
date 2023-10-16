import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/models/alquiler';
import { Producto } from 'src/app/models/producto';
import { AlquilerServiceService } from 'src/app/services/alquiler-service.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-crear-alquiler',
  templateUrl: './crear-alquiler.component.html',
  styleUrls: ['./crear-alquiler.component.css']
})
export class CrearAlquilerComponent implements OnInit {

  AlquilerForm : FormGroup;
  titulo = 'Crear Alquiler';
  id: string | null;
  listaProducto: Producto[]=[];
  seleccionado = 'producto';

  constructor(private fb: FormBuilder,
              private _alquilerService: AlquilerServiceService,
              private _productoService: ProductoServiceService,
              private router: Router,
              private aRoute : ActivatedRoute) {
    this.AlquilerForm = this.fb.group({
      tipocliente: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      direccion: ['', Validators.required],
      codigoherramienta: ['', Validators.required],
      diasprestamo: ['', Validators.required],
      deposito: ['', Validators.required],
      total: ['']
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
   }


  ngOnInit(): void {
    this.esEditar()
    this.obtenerProductos()
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listaProducto = data;
    }, error =>{
      console.log(error);
    })
  }

  agregarAlquiler(){
    console.log(this.AlquilerForm);

    if(this.AlquilerForm.invalid){

      return Object.values(this.AlquilerForm.controls).forEach(control =>{

        control.markAllAsTouched();

      })

    }

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

  //Validaciones
get tipoCNoValido(){
  return this.AlquilerForm.get('tipocliente')?.invalid && this.AlquilerForm.get('tipocliente')?.touched
}
get nombreNoValido(){
  return this.AlquilerForm.get('nombre')?.invalid && this.AlquilerForm.get('nombre')?.touched
}
get telefonoNoValido(){
  return this.AlquilerForm.get('telefono')?.invalid && this.AlquilerForm.get('telefono')?.touched
}
get direccionNoValido(){
  return this.AlquilerForm.get('direccion')?.invalid && this.AlquilerForm.get('direccion')?.touched
}
get codigoHNoValido(){
  return this.AlquilerForm.get('codigoherramienta')?.invalid && this.AlquilerForm.get('codigoherramienta')?.touched
}
get diaspNoValido(){
  return this.AlquilerForm.get('diasprestamo')?.invalid && this.AlquilerForm.get('diasprestamo')?.touched
}
get depositoNoValido(){
  return this.AlquilerForm.get('deposito')?.invalid && this.AlquilerForm.get('deposito')?.touched
}

}

