import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:3000/products"

  constructor(private http: HttpClient) { }


  getProducts() {
    return this.http.get<Product[]>(this.baseUrl)
  }



  persistProduct(data: Product) {
    return this.http.post<Product>(this.baseUrl, data)
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  putProduct(id: number | undefined, data: Product) {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, data)
  }

  deleteProduct(id: number | undefined) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}

