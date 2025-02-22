import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

export interface Product {
  id?: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  mainImage: string;
  images: string[];
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);


    return this.http.post<Product>(this.apiUrl, product, { headers }).pipe(
      tap(response => { 
        console.log('Producto creado:', response);
      }),
      catchError(error => {
        console.error('Error al crear producto:', error);
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

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' }).pipe(
      tap(() => console.log(`Producto con ID ${id} eliminado`)),
      catchError(error => {
        console.error('Error eliminando producto:', error);
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
