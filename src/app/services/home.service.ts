import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

   private apiUrl : string = "http://localhost:8085/api/v1/home";

  constructor(private httpClient:HttpClient ) { }

  // metodo que me permite traer de manera asincrona la lista de los productos
  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl);
}

  getProductById(id:number):Observable<Product>{
    return this.httpClient.get<Product>(this.apiUrl+"/"+id)
  }

  getCategoryList():Observable<Category[]>{
        return this.httpClient.get<Category[]>(this.apiUrl+"/categories");
     }

}
