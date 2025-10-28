// src/app/core/menu/menu.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '@services/cart'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
  private cartService = inject(CartService);

  // Observable que 'escuta' as mudanças no Service
  cartItemCount$: Observable<number> = this.cartService.cartItemCount$;
}