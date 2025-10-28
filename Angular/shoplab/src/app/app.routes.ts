// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; 
import { ProductListComponent } from './pages/product-list/product-list'; 

export const routes: Routes = [
  {
    path: '', // Rota raiz: Home Page
    component: HomeComponent,
    title: 'ShopLab | Início'
  },
  {
    path: 'produtos', // Rota de Listagem de Produtos
    component: ProductListComponent,
    title: 'ShopLab | E-books'
  },
  {
    path: 'carrinho', // Rota para o futuro componente Carrinho
    // Usamos um import dinâmico temporário. Se tiver o componente, ajuste: 
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent), // Temporário
    title: 'ShopLab | Carrinho'
  },
  {
    path: '**', // Rota 404
    redirectTo: '',
    pathMatch: 'full'
  }
];