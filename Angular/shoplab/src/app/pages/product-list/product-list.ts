// src/app/pages/product-list/product-list.ts

import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart';
import { Ebook } from '../../Types/ebook';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
// IMPORTANTE: Nome da classe deve ser ProductListComponent (Convenção Angular)
export class ProductListComponent { 

  private cartService = inject(CartService);

  // Lista de produtos fictícios
  products: Ebook[] = [
    { id: 101, title: 'Dominando o Angular', author: 'Equipe ShopLab', price: 49.90, image: 'angular-cover.png', description: 'Guia completo para criar projetos sólidos com a mais nova versão do Angular.' },
    { id: 102, title: '10 Dicas de Produtividade', author: 'Time de Estudos', price: 29.90, image: 'produtividade-cover.png', description: 'Métodos testados para otimizar seu tempo e aumentar o foco nos estudos.' },
    { id: 103, title: 'Tailwind CSS Rápido', author: 'Desenvolvedores ShopLab', price: 39.90, image: 'tailwind-cover.png', description: 'Aprenda a estilizar seu e-commerce em minutos, sem escrever CSS complexo.' },
    { id: 104, title: 'Bases de TypeScript', author: 'Prof. Exemplo', price: 59.90, image: 'typescript-cover.png', description: 'Fundamentos essenciais para qualquer desenvolvedor Front-end.' },
  ];

  /**
   * Adiciona um item ao carrinho, usando o CartService (comunicação Service/RxJS)
   */
  onAddToCart(ebook: Ebook) {
    this.cartService.addToCart(); 
    alert(`"${ebook.title}" adicionado ao carrinho!`);
  }
}