import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../../common/item-cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-sumary-order',
  standalone: false,
  templateUrl: './sumary-order.component.html',
  styleUrl: './sumary-order.component.css'
})
export class SumaryOrderComponent implements OnInit {

  items : ItemCart [] = [];
  totalCart: number = 0;
  firstname : string = '';
  lastname : string = '';
  email : string = '';
  address : string = '';
  cellphone : string = '';
  orderProducts:OrderProduct [] = [];
  userId : number = 1;

  constructor(private cartService:CartService,
    private userService:UserService,
    private orderService:OrderService
  ){}

  ngOnInit(): void {

    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
    this.getUserById(this.userId);

  }

  generateOrder(){
    this.items.forEach((item) => {
      let orderProduct = new OrderProduct(null, item.productId, item.quantity, item.price);
      this.orderProducts.push(orderProduct);
    });
    let order = new Order(null,new Date(),this.orderProducts,this.userId,OrderState.CANCELLED);
    this.orderService.createOrder(order).subscribe(
      data => {
        console.log(`order creada con id: ${data.id}`);
      },
      error => `Error: ${error}`
    );

//   export class OrderProduct {
//   constructor(
//     public id:number|null,
//     public productId:number,
//     public quantity:number,
//     public price:number,

// )
    }

  deleteItemCart(productId : number){
    this.cartService.deleteItemCart(productId);
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  getUserById(id:number){
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.firstname = user.firstName;
        this.lastname = user.lastName;
        this.email = user.email;
        this.address = user.address;
        this.cellphone = user.cellphone;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}

