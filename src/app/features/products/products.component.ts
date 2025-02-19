import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categoryId: number | null = null;
  allProducts: any[] = [];  // 🔹 Almacena todos los productos sin paginar
  products: any[] = [];
  apiUrl = 'http://localhost:8080/api/product';
  itemsPerPage: number = 10;  // 🔹 Cantidad de productos por página
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId') ? +params.get('categoryId')! : null;
      this.loadProducts(); 
    });    
  }

  loadProducts() {
    let params = new HttpParams();
    
    if (this.categoryId) {
      params = params.set('categoryId', this.categoryId.toString());  // ✅ Filtrar por ID de categoría
    }

    this.http.get<any[]>(this.apiUrl, { params }).subscribe(response => {
      console.log('Productos recibidos:', response);
      this.allProducts = response;  // ✅ Asigna directamente el array recibido
      this.calculatePagination();
    });
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;  // 🔹 Actualiza la página actual
      this.router.navigate([], { 
        queryParams: { page, categoryId: this.categoryId }, 
        queryParamsHandling: 'merge' 
      });
      this.updateDisplayedProducts();  // 🔹 Refresca los productos mostrados
    }
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.allProducts.length / this.itemsPerPage); // 🔹 Calcula el total de páginas
    this.updateDisplayedProducts();
  }
  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.allProducts.slice(startIndex, endIndex); // 🔹 Filtra los productos de la página actual
  }

}
