// src/app/pages/home/home.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Adicionado para links

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink], // Adicionado RouterLink
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
// IMPORTANTE: Nome da classe deve ser HomeComponent
export class HomeComponent { 
    // ... Aqui pode vir a lógica do Hero e Destaques ...
}