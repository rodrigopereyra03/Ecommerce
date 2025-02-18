import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

export interface Category {
  id?: number;
  name: string;
  mainImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/category';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  createCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.post<Category>(this.apiUrl, category, { headers }).pipe(
      tap(response => {
        console.log('Categoría creada:', response);
      }),
      catchError(error => {
        console.error('Error al crear categoría:', error);
        if (error.status === 403) {
          console.error('Error de autorización. Verificar rol y token.');
          if (this.isTokenExpired()) {
            this.authService.logout();
          }
        }
        return throwError(() => error);
      })
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ responseType: 'text' as 'json' }).pipe(
      tap(() => console.log(`Categoría con ID ${id} eliminada correctamente`)),
      catchError(error => {
        console.error('Error eliminando categoría:', error);
        return throwError(() => error);
      })
    );
  }

  private isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;
    
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenData.exp * 1000);
      return expirationDate <= new Date();
    } catch {
      return true;
    }
  }
}
