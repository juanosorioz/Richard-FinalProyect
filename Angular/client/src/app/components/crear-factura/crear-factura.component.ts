import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from 'src/app/models/factura';
import { FacturaServiceService } from 'src/app/services/factura-service.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

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

  constructor(private fb: FormBuilder,
              private _facturaService: FacturaServiceService,
              private _productoService: ProductoServiceService,
              private router: Router,
              private aRoute : ActivatedRoute) {
    this.FacturaForm = this.fb.group({
      tipocliente: ['', Validators.required],
      factura: ['', Validators.required],
      telefono: ['', Validators.required],
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
    })
  }
  agregarFactura(){
    console.log(this.FacturaForm);

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
        console.log("actualizado");
        this.router.navigate(['/lista-factura'])
      })
    }else{
      //crear
      console.log(FACTURA);
      this._facturaService.guardarFactura(FACTURA).subscribe(data =>{
        console.log('Guardado');
        this.router.navigate(['/lista-factura'])
      },error =>{
        console.log(error);
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
}

