// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // Importamos Observable aqui para clareza

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject para manter o estado da contagem de itens
  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  
  // Observable público para que outros componentes possam 'escutar'
  cartItemCount$: Observable<number> = this.cartItemsCountSubject.asObservable();

  constructor() { }

  addToCart() {
    // Incrementa a contagem e notifica todos os ouvintes
    const currentCount = this.cartItemsCountSubject.value;
    this.cartItemsCountSubject.next(currentCount + 1);
  }
}