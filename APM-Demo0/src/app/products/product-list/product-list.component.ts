import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import {  getCurrentProduct, getShowProductCode, State } from '../state/product.reducer';
import * as ProductAction from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(private store:Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    //this.store.select('products').subscribe( // this is the slice of the state of the reducer, the reducer is loaded in the module will load the state specified here
      this.store.select(getShowProductCode).subscribe( 
      showProductCode =>  this.displayCode = showProductCode
     );

  }


  checkChanged(): void {
    //this.displayCode = !this.displayCode;
    console.log('Check changed function called');
    // the reducer responds to the dispatched action, so when you subscribe call with the reducer name "products" here
    this.store.dispatch(
    //  {type: '[Product] Toggle Product Code'}
    ProductAction.toggleProductCode()
    );
  }

  newProduct(): void {
    //this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductAction.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductAction.setCurrentProduct({product}));
  }

}
