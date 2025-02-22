import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'http://localhost:8080/api/auth';
  private authStatusSource = new BehaviorSubject<boolean>(this.hasToken());
  authStatus = this.authStatusSource.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (token && userRole) {
      this.currentUserSubject.next({ token, role: userRole });
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/signup`, userData).pipe(
      catchError(error => {
        console.error('Error en registro:', error);
        return throwError(() => error);
      })
    );
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ jwt: string, userRole: string }>(`${this.backendUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('userRole', response.userRole);
        this.authStatusSource.next(true);
        this.currentUserSubject.next({ token: response.jwt, role: response.userRole });
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.authStatusSource.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
