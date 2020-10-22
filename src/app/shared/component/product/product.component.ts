import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ProductInterface} from "../../Type/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(private productService: ProductService) { }

  toggleFavorite(product: ProductInterface): void {
    this.productService.toggleFavorite(product)
  }

}
