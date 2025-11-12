import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './core/menu/menu';
import { ToastComponent } from "./components/toast/toast"; 


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, MenuComponent, ToastComponent], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shoplab');
}