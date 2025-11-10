// src/app/services/product.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ebook } from '../Types/ebook';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private http = inject(HttpClient);

  // 1. READ (Ler todos os produtos)
  getProducts(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>(this.apiUrl);
  }

  // 2. CREATE (Adicionar um novo produto)
  addProduct(ebook: Omit<Ebook, 'id'>): Observable<Ebook> {
    return this.http.post<Ebook>(this.apiUrl, ebook);
  }

  // 3. DELETE (Excluir um produto por ID)
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  // Opcional: READ (Ler um único produto por ID)
  getProductById(id: number): Observable<Ebook> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ebook>(url);
  }
}