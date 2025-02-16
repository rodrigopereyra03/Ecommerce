import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error al obtener categorías:', err)
    });
  }

}
