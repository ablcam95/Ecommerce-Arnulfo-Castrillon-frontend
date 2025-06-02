import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ItemCart } from '../../../common/item-cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-product',
  standalone: false,
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit{

  id : number = 0;
  name : string = "";
  description : string = "";
  capacidad:number = 0;
  tipo:string = "";
  price : number = 0;
  urlImage : string = "";
  quantity : number = 1;

  ngOnInit(): void {
    this.getProductById();
  }

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastr: ToastrService
) {

  }

  getProductById(){
    this.activatedRoute.params.subscribe(
      p =>{
        let id = p['id'];
        if(id){
        this.productService.getProductById(id).subscribe(
          data =>{
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.capacidad = data.capacidad;
            this.tipo = data.tipo;
            this.price = data.price;
            this.urlImage = data.urlImage;
          }
        )
      }
    });
  }

addCart(id :number){
  console.log(id);
  console.log(this.name)
  console.log(this.description);
  console.log(this.capacidad);
  console.log(this.tipo);
  console.log(this.price);
  console.log(this.urlImage);
  console.log(this.quantity);

  let item = new ItemCart(id, this.name, this.price, this.quantity);
  this.cartService.addItemCart(item);
  console.log("total carrito: ");
  console.log(this.cartService.totalCart());

  this. toastr.success(`Producto ${this.name} agregado al carrito`,"carrito de compras");

}


}
