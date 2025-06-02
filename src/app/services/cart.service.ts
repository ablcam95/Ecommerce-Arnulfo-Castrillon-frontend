import { Injectable } from '@angular/core';
import { ItemCart } from '../common/item-cart';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items : Map <number, ItemCart> = new Map<number, ItemCart>();

  itemList : ItemCart[] = [];

  constructor() { }

  addItemCart(itemCart: ItemCart){
    this.items.set(itemCart.productId, itemCart);
  }

  deleteItemCart(productId: number){
    this.items.delete(productId);
    this.items.forEach((item, key) => {
      console.log(`este es el clave a eliminar ${key} y este es el valor del itemCart ${item}`);
    })
  }

  totalCart(){
    let totalcart = 0;
    this.items.forEach((item, key) => {
      totalcart += item.getTotalPriceItem();

    })
    return totalcart;
  }

  convertToListFromMap(){
    this.itemList.splice(0,this.itemList.length);
    this.items.forEach((item, key) => {
      this.itemList.push(item);
    })
    return this.itemList;
  }
}
