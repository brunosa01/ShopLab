// src/app/service/cart.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Ebook } from '../Types/ebook'; // <- Importando o Type Ebook

// Define a estrutura de um Item do Carrinho
export interface CartItem extends Ebook {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject para manter o estado da lista de itens
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  
  // Observable público para que outros componentes possam 'escutar' a lista
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  
  // Observable derivado para manter a contagem total (usado no Menu)
  cartItemCount$ = this.cartItemsSubject.asObservable().pipe(
    // Mapeia a lista de itens para a soma total das quantidades
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );
  cartItemsCountSubject: any;

  constructor() { }

  /**
   * Adiciona ou incrementa um Ebook no carrinho.
   */
  addToCart(ebook: Ebook) {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === ebook.id);

    if (existingItem) {
      // Se já existe, incrementa a quantidade
      existingItem.quantity += 1;
    } else {
      // Se não existe, adiciona como um novo item
      const newItem: CartItem = { ...ebook, quantity: 1 };
      currentItems.push(newItem);
    }
    
    // Notifica todos os ouvintes (Menu, CartComponent) com a nova lista
    this.cartItemsSubject.next(currentItems);
  }

  /**
   * Remove uma unidade do item do carrinho ou o remove completamente se a quantidade for 1.
   */
  removeItem(itemId: number) {
    let currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === itemId);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        // Remove o item se a quantidade for 1
        currentItems = currentItems.filter(item => item.id !== itemId);
      }
    }

    this.cartItemsSubject.next(currentItems);
  }

  checkout() {
    this.cartItemsCountSubject.next(0); // Zera a contagem (opcional se você usa o pipe map, mas garante o reset)
    this.cartItemsSubject.next([]); // Limpa a lista de itens
  }
}