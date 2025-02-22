import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/core/services/category.service';
import { ImageService } from 'src/app/core/services/image.service';
import { Product, ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []; // Lista de categorías disponibles
  selectedImage: File | null = null;
  newProduct: Product = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    mainImage: '',
    images: [],
    categoryId: 0
  };

  constructor(private productService: ProductService, private categoryService: CategoryService, private imageService: ImageService) {}

  onMultipleFilesSelected(event: any) {
    const files: FileList = event.target.files;
    
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        this.uploadImage(file);
      });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(file);
    }
  }

  // Método para subir una imagen
uploadImage(file: File) {
  this.imageService.uploadImageToBackend(file).subscribe({
    next: (response: string) => {
      if (!this.newProduct.mainImage) {
        this.newProduct.mainImage = response; // La primera imagen será la principal
      } else {
        this.newProduct.images.push(response); // Las demás imágenes van al array
      }
    },
    error: (error) => {
      console.error('Error al subir la imagen', error);
    }
  });
}

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
