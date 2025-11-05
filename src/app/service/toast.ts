// src/app/service/toast.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Ebook } from '../Types/ebook';

// Define o formato da notificação
interface ToastEvent {
  show: boolean;
  product?: Ebook;
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Subject privado para emitir o evento
  private toastSubject = new Subject<ToastEvent>();

  // Observable público para que o ToastComponent se inscreva
  toastState$: Observable<ToastEvent> = this.toastSubject.asObservable();

  constructor() { }

  /**
   * Mostra o Toast de notificação com os dados do item.
   */
  showToast(product: Ebook, quantity: number) {
    this.toastSubject.next({
      show: true,
      product: product,
      quantity: quantity
    });

    // Opcional: Esconde o toast automaticamente após 4 segundos
    setTimeout(() => {
      this.hideToast();
    }, 4000);
  }

  /**
   * Esconde o Toast.
   */
  hideToast() {
    this.toastSubject.next({ show: false });
  }
}