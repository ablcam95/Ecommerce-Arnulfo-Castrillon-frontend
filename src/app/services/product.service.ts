import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl : string = "http://localhost:8085/api/v1/admin/products";

  constructor(private httpClient:HttpClient, private headerService:HeaderService) { }

  // metodo que me permite traer de manera asincrona la lista de los productos
  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl,{headers:this.headerService.headers});
  }
  // metodo que me permite crear un producto
  createProduct(formData:any):Observable<any>{
    return this.httpClient.post<Product>(this.apiUrl,formData,{headers:this.headerService.headers});
  }

  // método que me permite actualizar un producto existente
  updateProduct(id: number, formData: any): Observable<any> {
  return this.httpClient.put(`${this.apiUrl}/${id}`, formData,{headers:this.headerService.headers});
  }


  //metodo que me permite eliminar un producto
  deleteProductById(id:number):Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/${id}`,{headers:this.headerService.headers});
  }
  //metodo que me permite obtener un producto por Id
  getProductById(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`,{headers:this.headerService.headers})
  }
}
