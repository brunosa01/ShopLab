// src/app/pages/product-list/product-list.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // NOVO: Forms Reativos
import { CartService } from '../../service/cart'; 
import { Ebook } from '../../Types/ebook'; 
import { ProductService } from '../../service/product'; // <-- ADICIONADO: importar ProductService
import { ProductDetailsComponent, ProductQuantity } from '../product-details/product-details';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  // ReactiveFormsModule é obrigatório aqui
  imports: [CommonModule, ProductDetailsComponent, ReactiveFormsModule], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
    // Injeções
    private cartService = inject(CartService);
    private fb = inject(FormBuilder);
    private productService = inject(ProductService); // <-- INJEÇÃO

    // ESTADO
    selectedProduct: Ebook | null = null; 
    addProductForm!: FormGroup; 
    
    // LISTA DE PRODUTOS AGORA É UM OBSERVABLE
    products$!: Observable<Ebook[]>; // <-- MUDA PARA OBSERVABLE

    ngOnInit(): void {
      this.loadProducts(); // Carrega os dados ao inicializar
      
      this.addProductForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        author: ['', [Validators.required]],
        price: [0, [Validators.required, Validators.min(0.01)]],
      });
    }

    // NOVO MÉTODO: Carrega a lista de produtos da API (READ)
    loadProducts() {
      this.products$ = this.productService.getProducts();
    }


    // MÉTODOS DE ADMINISTRAÇÃO DE CATÁLOGO (CREATE e DELETE)

    addNewProduct() {
      if (this.addProductForm.invalid) {
        this.addProductForm.markAllAsTouched();
        alert('Formulário de Inclusão Inválido. Verifique o Título, Autor e Preço.');
        return;
      }
      
      const newProductData = this.addProductForm.value;
      
      this.productService.addProduct(newProductData).subscribe({
        next: () => {
          this.addProductForm.reset({ price: 0 }); // Limpa o formulário
          this.loadProducts(); // Recarrega a lista para mostrar o novo item (Importante para o READ)
          alert(`Novo E-book "${newProductData.title}" incluído na API!`);
        },
        error: (err) => console.error('Erro ao adicionar produto:', err)
      });
    }

    removeProduct(productId: number) {
      if (confirm('Tem certeza que deseja excluir este produto do catálogo?')) {
        this.productService.deleteProduct(productId).subscribe({
            next: () => {
                this.loadProducts(); // Recarrega a lista após a exclusão
                alert('Produto removido da API!');
            },
            error: (err) => console.error('Erro ao excluir produto:', err)
        });
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

    // Fecha a visualização de detalhes
    handleCloseDetails() {
      this.selectedProduct = null;
    }

    // trackBy para otimizar ngFor
    trackById(_: number, item: Ebook) {
      return (item as any).id;
    }
}