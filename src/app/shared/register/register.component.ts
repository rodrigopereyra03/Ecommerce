import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  registerForm: FormGroup;
  errorMessage: string = '';
  step: number = 1;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  nextStep(): void {
    if (this.step === 1) {
      const step1Fields = ['name', 'lastName', 'documentNumber', 'email', 'password', 'confirmPassword'];
      const isStep1Valid = step1Fields.every(field => this.registerForm.get(field)?.valid);
  
      if (!isStep1Valid) {
        this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
        return;
      }
  
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }
  
      this.errorMessage = '';
      this.step = 2;
    }
  }
  
  submit(): void {
    if (this.step === 2) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => (this.errorMessage = 'Error al registrar. Inténtalo nuevamente.')
      });
    }
  }

 

}
