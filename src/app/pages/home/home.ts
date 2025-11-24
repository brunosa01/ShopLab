

import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../../service/cart'; 
import { ProductService } from '../../service/product'; 
import { ToastService } from '../../service/toast'; 
import { Ebook } from '../../Types/ebook'; 
import { Observable, map } from 'rxjs';
import { HighlightAuthorPipe } from '../../Pipes/highlight-author.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, HighlightAuthorPipe], 
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
    // Injeções
    private cartService = inject(CartService);
    private productService = inject(ProductService); 
    private toastService = inject(ToastService); // <-- INJETADO PARA O BOTÃO

    // A lista de produtos em destaque agora é um Observable
    featuredEbooks$!: Observable<Ebook[]>;
    
    ngOnInit(): void {
        // Busca todos os produtos da API e usa o operador 'map' para pegar apenas os 3 primeiros
        this.featuredEbooks$ = this.productService.getProducts().pipe(
            map(products => products.slice(0, 3))
        );
    }
    
    /**
     * Adiciona o item rapidamente ao carrinho e dispara o Toast.
     */
    onAddToCart(ebook: Ebook) {
        this.cartService.addToCart(ebook);
        this.toastService.showToast(ebook, 1); // <-- CHAMA O TOAST (Substitui o antigo alert)
    }
}