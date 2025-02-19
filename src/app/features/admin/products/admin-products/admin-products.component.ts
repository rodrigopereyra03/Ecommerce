import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/core/services/category.service';
import { Product, ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []; // Lista de categorías disponibles
  newProduct: Product = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    mainImage: '',
    images: [],
    categoryId: 0
  };

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createProduct(): void {
    const productToCreate = { ...this.newProduct };

    if (!this.newProduct.categoryId) {
      alert('Selecciona una categoría.');
      return;
    }

    delete productToCreate.id;

    this.productService.createProduct(productToCreate).subscribe({
      next: () => {
        this.loadProducts(); // Recargar productos después de crear uno nuevo
        this.newProduct = { name: '', description: '', quantity: 0, price: 0, mainImage: '', images: [], categoryId: 0 }; // Limpiar el formulario
      },
      error: (err) => {
        alert('Hubo un error al crear el producto.');
        console.error(err);
      }
    });
  }

  deleteProduct(id?: number): void {
    if (id != null) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    } else {
      console.error('No se pudo eliminar el producto: ID no válido.');
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }
  

}
