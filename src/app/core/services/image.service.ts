import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://127.0.0.1:9000'; // Cambia la URL a tu servidor MinIO
  private backendUrl = 'http://localhost:8080'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para subir una imagen al servidor MinIO
  uploadImageToMinIO(image: File, token: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', image);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<string>(`${this.apiUrl}/api/images`, formData, { headers });
  }

  // Método para subir una imagen al servidor backend
  uploadImageToBackend(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', image);

    return this.http.post<string>(`${this.backendUrl}/api/images`, formData, { 
      responseType: 'text' as 'json'
    });
  }
}
