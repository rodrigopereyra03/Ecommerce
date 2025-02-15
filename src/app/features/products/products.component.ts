import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  category: string | null = null;
  products: any[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  sortOption: string = 'newest';
 
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1;  // Obtener la página actual desde los query params
      this.sortOption = params['sort'] || 'newest';  // Obtener el tipo de orden desde los query params
      this.category = params['category'];  // Obtener la categoría, si está presente
      console.log('Filtrar productos por categoría:', this.category);

      this.loadProducts();  // Cargar los productos con los parámetros actualizados
    });
  }

/*  loadProducts() {
    const url = `http://localhost:8080/api/products?page=${this.currentPage}&size=10&sort=${this.sortOption}`;
    this.http.get<{ products: any[], totalPages: number }>(url).subscribe(response => {
      this.products = response.products;
      this.totalPages = response.totalPages;
    });
  }*/

  loadProducts() {
    // Simulando una respuesta del backend
    this.products = [
      { name: 'Producto 1', price: 100, imageUrl: 'assets/img/category1.jpg' },
      { name: 'Producto 2', price: 200, imageUrl: 'assets/img/category2.jpg' },
      { name: 'Producto 3', price: 300, imageUrl: 'assets/img/category3.jpg' },
      { name: 'Producto 3', price: 300, imageUrl: 'assets/img/category4.jpg' },
      { name: 'Producto 3', price: 300, imageUrl: 'assets/img/category5.jpg' }
      
    ];
    this.totalPages = 1; // Para simular una sola página
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.router.navigate([], { queryParams: { page, sort: this.sortOption }, queryParamsHandling: 'merge' });
    }
  }

  changeSort(selectElement: EventTarget | null) {
    const target = selectElement as HTMLSelectElement; // Hacemos un casting para tratarlo como un select
    if (target && target.value) {
      this.router.navigate([], { queryParams: { page: 1, sort: target.value }, queryParamsHandling: 'merge' });
    }
  }

}
