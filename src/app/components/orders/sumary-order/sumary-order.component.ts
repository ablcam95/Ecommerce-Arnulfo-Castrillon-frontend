import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../../common/item-cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../services/order.service';
import { PaymentService } from '../../../services/payment.service';
import { DataPayment } from '../../../common/data-payment';
import { SessionStorageService } from '../../../services/session-storage.service';

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
  userId : number = 0;

  constructor(private cartService:CartService,
    private userService:UserService,
    private orderService:OrderService,
    private paymentService:PaymentService,
    private sessionStorage:SessionStorageService
  ){}

  ngOnInit(): void {

    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
    const token = this.sessionStorage.getItem('token');
    if (token && token.id) {
      this.userId = token.id;
      this.getUserById(this.userId);
  } else {
      console.error('No se encontró el token del usuario');
  }

    setTimeout(() => {
      this.sessionStorage.removeItem('token');
    }, 600000);
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
        this.sessionStorage.setItem('order',data);
      },
    );

    //redirrecion y pago a Paypal
    let urlPayment;
    let dataPayment = new DataPayment('PAYPAL',this.totalCart.toString(),'COP','COMPRA');

    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(
      data => {
        console.log(`respuesta exitosa`);
        urlPayment = data.url;
        window.location.href = urlPayment;
      },
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

