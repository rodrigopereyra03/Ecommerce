import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'http://localhost:8080/api/auth'; // Reemplaza con tu URL
  private authStatusSource = new BehaviorSubject<boolean>(this.hasToken());
  authStatus = this.authStatusSource.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/signup`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ jwt: string }>(`${this.backendUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.jwt);
        this.authStatusSource.next(true); // Notificar que el usuario ha iniciado sesión
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatusSource.next(false); // Notificar que el usuario ha cerrado sesión
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
