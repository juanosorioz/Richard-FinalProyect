import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/services/producto-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  ProductoForm : FormGroup;
  titulo = 'Crear Producto';
  id: string | null;
  constructor(private fb: FormBuilder,
              private _productoService: ProductoServiceService,
              private router: Router,
              private aRoute : ActivatedRoute) {
    this.ProductoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.ProductoForm);

    const PRODUCTO : Producto ={
      nombre : this.ProductoForm.get('producto')?.value,
      categoria : this.ProductoForm.get('categoria')?.value,
      cantidad : this.ProductoForm.get('cantidad')?.value,
      precio : this.ProductoForm.get('precio')?.value
    }

    if(this.id !== null)
    {
      //editar
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
        console.log("actualizado");
        this.router.navigate(['/lista-producto'])
      })
    }else{
      //crear
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
        console.log('Guardado');
        this.router.navigate(['/lista-producto'])
      },error =>{
        console.log(error);
        this.ProductoForm.reset();
      })
    }
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Producto"
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
        this.ProductoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          cantidad: data.cantidad,
          precio: data.precio
        })
      })
    }
  }
}
