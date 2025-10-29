// src/app/pages/cart/cart.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../service/cart'; 
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent {
  private cartService = inject(CartService);

  // Observables para exibir a lista e o subtotal
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  
  // Calcula o subtotal dos itens
  subtotal$: Observable<number> = this.cartItems$.pipe(
    map(items => 
      items.reduce((total, item) => total + (item.price * item.quantity), 0)
    )
  );
  router: any;

  /**
   * Remove uma unidade do item (chama a lógica no Service)
   */
  onRemoveItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  onCheckout() {
    this.cartService.checkout();
    
    // Redireciona para a Home e passa um estado com a mensagem
    this.router.navigate(['/'], { 
        state: { checkoutSuccess: true } 
    });
}
}