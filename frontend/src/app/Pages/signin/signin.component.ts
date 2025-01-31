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

  constructor(private loginService: LoginService, private router: Router) {}

  login(): void {
    // Ensure payload conforms to API documentation
    const loginPayload = {
      email: this.email.trim(),
      password: this.password.trim(),
    };

    this.loginService.login(loginPayload).subscribe({
      next: (response) => {
        sessionStorage.setItem('userId', response.staff.id.toString());
        sessionStorage.setItem('role', response.staff.role.toString());

        const role = response.staff.role;
        if (role === 'Nurse') {
          this.router.navigate(['/soin-list']);
        } else if (role === 'Radiologist') {
          this.router.navigate(['/radio-list']);
        } else if (role === 'Admin') {
          this.router.navigate(['/dpilist']);
        } else if (role === 'Doctor') {
          const userId = response.staff.id;
          this.router.navigate([`/doctor/${userId}`]);
        } else if (role === 'LabTechnician') {
          this.router.navigate(['/tests-list']);
        } else {
          this.router.navigate(['/dpi-patient/', response.staff.id]);
          
        }
      },
      error: (error) => {
        if (error.error.email) {
          console.error('Email error:', error.error.email);
        }
        if (error.error.password) {
          console.error('Password error:', error.error.password);
        }
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}