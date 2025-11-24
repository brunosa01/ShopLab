
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../service/toast';
import { Ebook } from '../../Types/ebook';
import { HighlightAuthorPipe } from '../../Pipes/highlight-author.pipe';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, RouterLink, HighlightAuthorPipe, CurrencyPipe],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  private toastService = inject(ToastService);
  private subscription!: Subscription;

  isVisible: boolean = false;
  product!: Ebook;
  quantity!: number;

  ngOnInit() {
    // Inscreve-se no estado do serviço
    this.subscription = this.toastService.toastState$.subscribe(state => {
      this.isVisible = state.show;
      if (state.product) {
        this.product = state.product;
        this.quantity = state.quantity || 1;
      }
    });
  }

  closeToast() {
    this.toastService.hideToast();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}