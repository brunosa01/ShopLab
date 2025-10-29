// src/app/pages/product-list/product-list.component.ts (Conteúdo atualizado)

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart'; 
import { Ebook } from '../../Types/ebook'; 
// 1. IMPORTAR O NOVO COMPONENTE
import { ProductDetailsComponent } from '../product-details/product-details';

@Component({
  selector: 'app-product-list',
  standalone: true,
  // 2. ADICIONAR O NOVO COMPONENTE NO IMPORTS
  imports: [CommonModule, RouterLink, ProductDetailsComponent], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent { 

  private cartService = inject(CartService);

  // 3. ESTADO PARA CONTROLAR O PRODUTO SELECIONADO
  selectedProduct: Ebook | null = null; 

  products: Ebook[] = [
      // ... (sua lista de produtos aqui) ...
      { id: 101, title: 'Dominando o Angular', author: 'Equipe ShopLab', price: 49.90, image: 'angular-cover.png', description: 'Guia completo para criar projetos sólidos com a mais nova versão do Angular.' },
      { id: 102, title: '10 Dicas de Produtividade', author: 'Time de Estudos', price: 29.90, image: 'produtividade-cover.png', description: 'Métodos testados para otimizar seu tempo e aumentar o foco nos estudos.' },
      { id: 103, title: 'Tailwind CSS Rápido', author: 'Desenvolvedores ShopLab', price: 39.90, image: 'tailwind-cover.png', description: 'Aprenda a estilizar seu e-commerce em minutos, sem escrever CSS complexo.' },
      { id: 104, title: 'Bases de TypeScript', author: 'Prof. Exemplo', price: 59.90, image: 'typescript-cover.png', description: 'Fundamentos essenciais para qualquer desenvolvedor Front-end.' },
  ];

  trackByProductId(index: number, product: Ebook): number {
        return product.id;
    }

  onAddToCart(ebook: Ebook) {
      this.cartService.addToCart(ebook); // Passa o objeto do ebook
      console.log(`E-book "${ebook.title}" adicionado.`);
      // O alert agora será chamado via handleProductAdded para evitar duplicidade
    }

  // Novo método para ABRIR a tela de detalhes
  showDetails(ebook: Ebook) {
    this.selectedProduct = ebook;
  }

  // 4. Método que RECEBE O OUTPUT do Detalhes (usará a lógica do Service)
  handleProductAdded(ebook: Ebook) {
        this.cartService.addToCart(ebook); // Passa o objeto do ebook
        alert(`"${ebook.title}" adicionado ao carrinho!`);
        this.selectedProduct = null; // Fecha a tela de detalhes após a compra
    }

  handleCloseDetails() {
      this.selectedProduct = null;
  }

  // Função trackBy usada pelo *ngFor para identificar itens pelo id
  trackById(index: number, product: Ebook): number {
    return product.id;
  }
}
