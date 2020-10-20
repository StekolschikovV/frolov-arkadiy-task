import { Injectable } from '@angular/core';
import {ProductInterface} from "../Type/product.interface";
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject} from "rxjs";
import {ResponseProductInterface} from "../Type/response.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList = new BehaviorSubject<ProductInterface[]>([])

  constructor(private http: HttpClient) {
    this.get()
  }

  get() {
     this.http.get<ResponseProductInterface>(environment.productUrl).subscribe((e)=>{
       this.productList.next(this.normalizeData(e.response))
     })
  }

  private normalizeData(dataIn: ProductInterface[]): ProductInterface[] {
    let newProductList = dataIn.map((e)=>{
      e.isFavorite = false
      return e
    })
    return newProductList
  }

  toggleFavorite(id: number) {
    let newProductList = this.productList.value.map((e)=>{
      if(e.id == id) {
        e.isFavorite = !e.isFavorite
        return e
      } else {
        return e
      }
    })
    this.productList.next(newProductList)
  }

}
