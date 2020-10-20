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
    this.productList.subscribe((e)=>{
      console.log('---', e)
    })
  }

  get() {
     this.http.get<ResponseProductInterface>(environment.productUrl).subscribe((e)=>{
       this.productList.next(e.response)
     })
  }

  toggleFavorite(id: number) {

  }

}
