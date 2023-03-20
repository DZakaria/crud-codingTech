import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit  {

  products: Product [] = []
  editable: boolean = false


  myProduct: Product = {
    categories: "",
    tags: ""
  }


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.productService.getProducts().subscribe((response:any) => this.products = response)
  }

  saveProduct() {
    this.productService.persistProduct(this.myProduct).subscribe((response:any) => {
      this.products = [response, ...this.products]
      this.initProduct()
    })
  }

  initProduct() {
    this.myProduct = {
      categories: "",
      tags: ""
    }
  }

  updateProduct() {

    let { id, categories, tags } = this.myProduct

    this.productService.putProduct(id, {categories, tags}).subscribe(response => {
      this.editable = false
      this.initProduct()
    })
  }

  editProduct(data: Product) {
    this.myProduct = data
    this.editable = true
  }


  destroyProduct(id: number | undefined) {

    if(!confirm('Are you to delete this article ? ')) {
      return
    }

    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }


}
