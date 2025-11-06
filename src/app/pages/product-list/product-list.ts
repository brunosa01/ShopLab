// src/app/pages/product-list/product-list.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // NOVO: Forms Reativos
import { CartService } from '../../service/cart'; 
import { Ebook } from '../../Types/ebook'; 
import { ProductDetailsComponent, ProductQuantity } from '../product-details/product-details';

@Component({
  selector: 'app-product-list',
  standalone: true,
  // ReactiveFormsModule é obrigatório aqui
  imports: [CommonModule, RouterLink, ProductDetailsComponent, ReactiveFormsModule], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
handleCloseDetails() {
throw new Error('Method not implemented.');
} 
    private cartService = inject(CartService);
    private fb = inject(FormBuilder); 

    // ESTADO
    selectedProduct: Ebook | null = null; 
    addProductForm!: FormGroup; 
    nextId: number = 105; 
    
    // LISTA DE PRODUTOS
    products: Ebook[] = [
        { id: 101, title: 'Dominando o Angular', author: 'Equipe ShopLab', price: 49.90, image: 'angular-cover.png', description: 'Guia completo para criar projetos sólidos com a mais nova versão do Angular.' },
        { id: 102, title: '10 Dicas de Produtividade', author: 'Time de Estudos', price: 29.90, image: 'produtividade-cover.png', description: 'Métodos testados para otimizar seu tempo e aumentar o foco nos estudos.' },
        { id: 103, title: 'Tailwind CSS Rápido', author: 'Desenvolvedores ShopLab', price: 39.90, image: 'tailwind-cover.png', description: 'Aprenda a estilizar seu e-commerce em minutos, sem escrever CSS complexo.' },
        { id: 104, title: 'Bases de TypeScript', author: 'Prof. Exemplo', price: 59.90, image: 'typescript-cover.png', description: 'Fundamentos essenciais para qualquer desenvolvedor Front-end.' },
    ];

    ngOnInit(): void {
      this.addProductForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        author: ['', [Validators.required]],
        price: [0, [Validators.required, Validators.min(0.01)]],
      });
    }

    // MÉTODOS DE ADMINISTRAÇÃO DE CATÁLOGO
    addNewProduct() {
      if (this.addProductForm.invalid) {
        this.addProductForm.markAllAsTouched();
        alert('Formulário de Inclusão Inválido. Verifique o Título, Autor e Preço.');
        return;
      }
      
      const newProduct: Ebook = {
        id: this.nextId++,
        title: this.addProductForm.value.title,
        author: this.addProductForm.value.author,
        price: this.addProductForm.value.price,
        description: 'Descrição padrão de um novo e-book adicionado pelo administrador.',
        image: 'novo-ebook.png'
      };

      this.products.unshift(newProduct); 
      this.addProductForm.reset({ price: 0 }); 
      alert(`Novo E-book "${newProduct.title}" incluído no catálogo!`);
    }

    removeProduct(productId: number) {
      if (confirm('Tem certeza que deseja excluir este produto do catálogo?')) {
        this.products = this.products.filter(p => p.id !== productId);
        alert('Produto removido do catálogo!');
      }
    }


    // MÉTODOS DE CARRINHO (EXISTENTES)
    showDetails(ebook: Ebook) {
      this.selectedProduct = ebook;
    }

    handleProductAdded(data: ProductQuantity) {
        for (let i = 0; i < data.quantity; i++) {
            this.cartService.addToCart(data.product); 
        }
        alert(`${data.quantity}x de "${data.product.title}" adicionado ao carrinho!`);
        this.selectedProduct = null;
    }
}