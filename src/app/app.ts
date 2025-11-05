import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/menu/menu'; // <- Adicionado import


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, MenuComponent], // <- Adicionado MenuComponent
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shoplab');
}