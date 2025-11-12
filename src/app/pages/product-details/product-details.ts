

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ebook } from '../../Types/ebook'; 
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

// Definimos uma interface para o evento de saída
export interface ProductQuantity {
  product: Ebook;
  quantity: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetailsComponent {

  @Input() product!: Ebook; 
  
  // 1. PROPRIEDADE DE QUANTIDADE COM VALOR PADRÃO
  quantity: number = 1; 

  // 2. OUTPUT AJUSTADO: Emite um objeto que inclui a quantidade
  @Output() productAdded = new EventEmitter<ProductQuantity>();

  @Output() closeDetails = new EventEmitter<void>(); 

  buyProduct() {
    // 3. EMITE O OBJETO COMPLETO: produto e quantidade
    this.productAdded.emit({
      product: this.product,
      quantity: this.quantity
    });
    alert(`${this.quantity}x de "${this.product.title}" adicionado para compra.`);
  }

  goBackToList() {
    this.closeDetails.emit();
  }

  // Métodos de controle de quantidade
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
