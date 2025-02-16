import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, completa ambos campos.';
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        console.log('Rol del usuario:', localStorage.getItem('userRole'));
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']); // Redirigir al panel de admin si es admin
        } else {
          this.router.navigate(['/products']); // Redirigir a productos si es usuario normal
        }
      },
      error: (err) => (this.errorMessage = err.message || 'El correo o la contraseña son incorrectos.')
    });
  }
 
}
