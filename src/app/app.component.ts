import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyect';
  isProductsPage = false;
  isLoginPage = false;
  isRegisterPage = false
  isAdminPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isProductsPage = event.url === '/products';
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/register'
        this.isAdminPage = event.url.startsWith('/admin');
      }
    });
  }
}
