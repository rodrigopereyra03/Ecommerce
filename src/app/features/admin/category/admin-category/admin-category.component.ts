import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  categories: Category[] = [];
  newCategory: Category = { id: 0, name: '', mainImage: '' };
  
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = { id: 0, name: '', mainImage: '' };
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
  }

}
