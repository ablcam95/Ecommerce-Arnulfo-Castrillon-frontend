import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  page: number = 1;

  products : Product[] = [];

  constructor(private productService:ProductService){

  }

  ngOnInit(): void {
    this.listProduct();
  }

  //traer lista de producto
  listProduct(){
    this.productService.getProducts().subscribe(
      data => {
        this.products = data.sort((a, b) => b.id - a.id);
        console.log(this.products);
      }
    );
  }

  //eliminar productos por Id
  deleteporductById(id:number){
    Swal.fire({
      title: "estas seguro?",
      text: "estas seguro de querer eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe(
          //despues de eliminar se realiza la llamada del metodo listPorduct()
          ()=>this.listProduct()
        );
        Swal.fire({
          title: "Producto eliminado!",
          text: "tu registro ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

}
