import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  login() {
    console.log('Iniciar sesión');
    // Aquí puedes redirigir a la página de login
  }

  logout() {
    console.log('Cerrar sesión');
    // Aquí puedes hacer lógica para cerrar sesión
  }
  
}
