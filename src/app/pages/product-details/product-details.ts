

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { Ebook } from '../../Types/ebook'; 
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HighlightAuthorPipe } from '../../Pipes/highlight-author.pipe'; 

// Definimos uma interface para o evento de saída
export interface ProductQuantity {
  product: Ebook;
  quantity: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe, HighlightAuthorPipe], 
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetailsComponent {
  
  @Input() product!: Ebook; 
  
  quantity: number = 1; 

  @Output() productAdded = new EventEmitter<ProductQuantity>();
  @Output() closeDetails = new EventEmitter<void>(); 

  buyProduct() {
    this.productAdded.emit({
      product: this.product,
      quantity: this.quantity
    });
  }

  goBackToList() {
    this.closeDetails.emit();
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}