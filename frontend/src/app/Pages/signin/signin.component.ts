import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  staffId: number | null = null;
  staffRole: string | null = null;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private loginService: LoginService,private router: Router) {}

  login(): void {
    // Ensure payload conforms to API documentation
    const loginPayload = {
      email: this.email.trim(),
      password: this.password.trim(),
    };

    this.loginService.login(loginPayload).subscribe({
      next: (response) => {
        sessionStorage.setItem('userId',response.staff.id.toString()); 
        this.router.navigate(['/dpi-doctor/3']);

      const role = response.staff.role; 
      
        
      },
      error: (error) => {
        
        if (error.error.email) {
          console.error('Email error:', error.error.email);
        }
        if (error.error.password) {
          console.error('Password error:', error.error.password);
        }
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
