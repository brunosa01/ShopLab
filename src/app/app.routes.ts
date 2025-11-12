// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; 
import { ProductListComponent } from './pages/product-list/product-list'; 
// IMPORTAR O NOVO COMPONENTE
import { CartComponent } from './pages/cart/cart'; 

export const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    title: 'ShopLab | Início'
  },
  {
    path: 'produtos', 
    component: ProductListComponent,
    title: 'ShopLab | E-books'
  },
  {
    path: 'carrinho', 
    component: CartComponent, 
    title: 'ShopLab | Carrinho'
  },
  {
    path: '**', 
    redirectTo: '',
    pathMatch: 'full'
  }
];