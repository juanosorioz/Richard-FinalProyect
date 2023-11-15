import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { FacturaServiceService } from 'src/app/services/factura-service.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  FacturaForm : FormGroup;
  titulo = 'Crear Factura';
  id: string | null;
  listaProducto: Producto[] = [];
  seleccionado = 'producto';
  cantidadF: any;
  nombreF: any;


  constructor(private fb: FormBuilder,
              private _facturaService: FacturaServiceService,
              private _productoService: ProductoServiceService,
              private router: Router,
              private aRoute : ActivatedRoute) {
    this.FacturaForm = this.fb.group({
      tipocliente: ['', Validators.required],
      factura: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
      direccion: ['', Validators.required],
      productoF: ['', Validators.required],
      cantidades: ['', Validators.required],
      price: ['', Validators.required]
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo Salio Mal',
        footer: 'Revisa El Error'
      })
    })
  }



  agregarFactura(){
    console.log(this.FacturaForm);


    if(this.FacturaForm.invalid){

      return Object.values(this.FacturaForm.controls).forEach(control =>{

        control.markAllAsTouched();

      })

    }

    const FACTURA : Factura ={
      tipocliente : this.FacturaForm.get('tipocliente')?.value,
      nombre : this.FacturaForm.get('factura')?.value,
      telefono : this.FacturaForm.get('telefono')?.value,
      direccion : this.FacturaForm.get('direccion')?.value,
      productoF : this.FacturaForm.get('productoF')?.value,
      cantidades : this.FacturaForm.get('cantidades')?.value,
      price : this.FacturaForm.get('price')?.value,
    }

    if(this.id !== null)
    {
      //editar
      this._facturaService.editarFactura(this.id, FACTURA).subscribe(data =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha Editado Correctamente',
          showConfirmButton: false,
          timer: 1100
        })
        this.router.navigate(['/lista-factura'])
      })
    }else{
      //crear
      console.log(FACTURA);
      this._facturaService.guardarFactura(FACTURA).subscribe(data =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha Guardado Correctamente',
          showConfirmButton: false,
          timer: 1100
        })
        this.actualizarStock();
        this.router.navigate(['/lista-factura'])

      },error =>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo Salio Mal, Revisa el error',
          footer: 'No se guardaron los datos'
        })
        this.FacturaForm.reset();
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Factura"
      this._facturaService.obtenerFactura(this.id).subscribe(data=>{
        this.FacturaForm.setValue({
          tipocliente: data.tipocliente,
          factura: data.nombre,
          telefono: data.telefono,
          direccion: data.direccion,
          productoF: data.productoF,
          cantidades: data.cantidades,
          price: data.price
        })
      })
    }
  }

  actualizarStock(): void {
    this._productoService.actualizarStock().subscribe(
        response => {
            console.log(response.message); // Mensaje de éxito desde el backend
        },
        error => {
            console.error(error);
        }
    );
}

    //Validaciones
get tipoCNoValido(){
  return this.FacturaForm.get('tipocliente')?.invalid && this.FacturaForm.get('tipocliente')?.touched
}
get nombreNoValido(){
  return this.FacturaForm.get('factura')?.invalid && this.FacturaForm.get('factura')?.touched
}
get telefonoNoValido(){
  return this.FacturaForm.get('telefono')?.invalid && this.FacturaForm.get('telefono')?.touched
}
get direccionNoValido(){
  return this.FacturaForm.get('direccion')?.invalid && this.FacturaForm.get('direccion')?.touched
}
get codigoHNoValido(){
  return this.FacturaForm.get('productoF')?.invalid && this.FacturaForm.get('productoF')?.touched
}
get cantidadNoValido(){
  return this.FacturaForm.get('cantidades')?.invalid && this.FacturaForm.get('cantidades')?.touched
}
get priceNoValido(){
  return this.FacturaForm.get('price')?.invalid && this.FacturaForm.get('price')?.touched
}

}

