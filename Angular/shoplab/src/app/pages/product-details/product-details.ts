// src/app/pages/product-details/product-details.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ebook } from '../../Types/ebook'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})

export class ProductDetailsComponent {

  @Input() product!: Ebook; 

  // Output para Adicionar (continua emitindo o produto)
  @Output() productAdded = new EventEmitter<Ebook>();

  // Output para Fechar/Voltar (emite um evento vazio)
  @Output() closeDetails = new EventEmitter<void>(); 

  buyProduct() {
    this.productAdded.emit(this.product);
  }

  /**
   * MÉTODO DE VOLTAR: Emite o evento 'closeDetails'
   */
  goBackToList() {
    this.closeDetails.emit();
  }

}