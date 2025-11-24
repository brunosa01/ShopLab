

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CartService, CartItem } from '../../service/cart'; 
import { Observable, map } from 'rxjs';
import { HighlightAuthorPipe } from '../../Pipes/highlight-author.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CurrencyPipe, HighlightAuthorPipe], 
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit { 
  // Injeções
  private cartService = inject(CartService);
  private router = inject(Router);
  private fb = inject(FormBuilder); 

  // Propriedades de Estado
  showCheckoutForm: boolean = false;
  checkoutForm!: FormGroup; 

  // Observables do Carrinho
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  subtotal$: Observable<number> = this.cartItems$.pipe(
    map(items => 
      items.reduce((total, item) => total + (item.price * item.quantity), 0)
    )
  );

  ngOnInit(): void {
    // 1. Definição do FormGroup com FormBuilder e Validações
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      paymentMethod: ['pix', [Validators.required]] // Valor padrão 'pix'
    });
  }

  // Métodos de Ação
  
  onRemoveItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  goToCheckout() {
    this.showCheckoutForm = true;
  }

  /**
   * 2. Finaliza a Compra: Valida e Limpa o Carrinho
   */
  onCheckout() {
    if (this.checkoutForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente para finalizar a compra.');
      this.checkoutForm.markAllAsTouched(); // Marca para mostrar erros no HTML
      return;
    }

    // Ação de Sucesso
    console.log('Dados do Checkout:', this.checkoutForm.value);
    this.cartService.checkout();

    // Redireciona para a Home com status de sucesso
    this.router.navigate(['/'], { 
        state: { checkoutSuccess: true } 
    });
  }
}