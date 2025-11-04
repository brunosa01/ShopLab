// src/app/pages/home/home.ts

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; // Para o botão Hero
import { CommonModule } from '@angular/common'; // Para usar @for
import { CartService } from '../../service/cart'; // Para adicionar ao carrinho
import { Ebook } from '../../Types/ebook'; // Tipo de Produto

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule], 
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent { 
    private cartService = inject(CartService);

    // E-books para a seção de Destaques da Home
    featuredEbooks: Ebook[] = [
        { id: 201, title: 'Dominando o Angular', author: 'Equipe ShopLab', price: 49.90, image: 'angular-cover.png', description: 'Guia completo para criar projetos sólidos com a mais nova versão do Angular.' },
        { id: 202, title: '10 Dicas de Produtividade', author: 'Time de Estudos', price: 29.90, image: 'produtividade-cover.png', description: 'Métodos testados para otimizar seu tempo e aumentar o foco nos estudos.' },
        { id: 203, title: 'Tailwind CSS Rápido', author: 'Desenvolvedores ShopLab', price: 39.90, image: 'tailwind-cover.png', description: 'Aprenda a estilizar seu e-commerce em minutos, sem escrever CSS complexo.' },
    ];
    
    /**
     * Adiciona o item rapidamente ao carrinho (usado nos cards de destaque)
     */
    onAddToCart(ebook: Ebook) {
        this.cartService.addToCart(ebook);
        alert(`"${ebook.title}" adicionado ao carrinho!`);
    }

    
}