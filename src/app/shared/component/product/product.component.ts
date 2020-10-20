import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(private productService: ProductService) { }

  toggleFavorite(id: number): void {
    this.productService.toggleFavorite(id)
  }

}
