import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/core/services/category.service';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  selectedImage: File | null = null;
  categories: Category[] = [];
  newCategory: Category = { id: 0, name: '', mainImage: '' };
  
  constructor(private categoryService: CategoryService,private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    this.imageService.uploadImageToBackend(file).subscribe({
      next: (response: string) => {
        this.newCategory.mainImage = response;  // Asumir que la URL es la respuesta
      },
      error: (error) => {
        console.error('Error al subir la imagen', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  createCategory(): void {
    const categoryToCreate = { ...this.newCategory };
    delete categoryToCreate.id; // Eliminar id antes de crear una nueva categoría
    
    this.categoryService.createCategory(categoryToCreate).subscribe({
      next: () => {
        this.loadCategories(); // Recargar categorías después de crear una nueva
        this.newCategory = { id: 0, name: '', mainImage: '' }; // Limpiar el formulario
      },
      error: (err) => {
        alert('Hubo un error al crear la categoría.');
        console.error(err);
      }
    });
  }

  deleteCategory(id?: number): void {
    if (id != null) {  // Verificar que id no sea null o undefined
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories(); // Recargar categorías después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar categoría:', err);
        }
      });
    } else {
      console.error('No se pudo eliminar la categoría: id no válido.');
    }
  }

}
