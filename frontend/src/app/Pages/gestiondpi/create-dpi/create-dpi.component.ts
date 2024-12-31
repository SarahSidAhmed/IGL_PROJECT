import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateDpiService } from '../../../services/create-dpi.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-dpi',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [CreateDpiService],

  templateUrl: './create-dpi.component.html',
  styleUrls: ['./create-dpi.component.scss'],
})
export class CreateDpiComponent implements OnInit {
  onLogout(): void {
    this.router.navigate(['/signin']);
  }
  createDpiForm!: FormGroup;
  doctors: any[] = [];
  isLoadingDoctors = false;
  doctorLoadError = '';
  isSubmitting = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private createDpiService: CreateDpiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDoctors();
  }
  private loadDoctors(): void {
    this.isLoadingDoctors = true;
    this.doctorLoadError = '';

    this.createDpiService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.isLoadingDoctors = false;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.doctorLoadError = 'Erreur lors du chargement des médecins';
        this.isLoadingDoctors = false;
      },
    });
  }
  private initializeForm(): void {
    this.createDpiForm = this.fb.group({
      social_security_number: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
          // Validators.pattern('^[0-9]+$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          //Validators.minLength(8),
          /* Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
            ),*/
        ],
      ],
      confirm_password: ['', [Validators.required]],
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      birthdate: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          // Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      emergency_contact_name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      emergency_contact_phone: [
        '',
        [
          Validators.required,
          //Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      emergency_contact_relationship: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      gender: ['', Validators.required],
      blood_type: ['', Validators.required],
      mutuelle_name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
      mutuelle_policy_number: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      medical_history: [''],
      hospital: ['', Validators.required],
      doctor: [''],
    });
  }

  private passwordMatchValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  logFormStatus(): void {
    console.log('Form Valid:', this.createDpiForm.valid);
    console.log('Form Values:', this.createDpiForm.value);
    console.log('Form Errors:', this.getFormValidationErrors());
  }
  getFormValidationErrors(): any {
    const errors: any = {};
    Object.keys(this.createDpiForm.controls).forEach((key) => {
      const controlErrors = this.createDpiForm.get(key)?.errors;
      if (controlErrors != null) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }

  onSubmit(): void {
    this.logFormStatus();
    if (this.createDpiForm.valid && !this.isSubmitting) {
      const formData = {
        ...this.createDpiForm.value, // Spread the form's current values
        password: this.createDpiForm.get('password')?.value, // Ensure password is included

        first_name: this.createDpiForm.get('first_name')?.value, // First Name
        last_name: this.createDpiForm.get('last_name')?.value, // Last Name
        birthdate: new Date(this.createDpiForm.get('birthdate')?.value)
          .toISOString()
          .split('T')[0], // Correct birthdate format
        email: this.createDpiForm.get('email')?.value, // Email
        address: this.createDpiForm.get('address')?.value, // Address
        phone: this.createDpiForm.get('phone')?.value, // Phone Number
        emergency_contact_name: this.createDpiForm.get('emergency_contact_name')
          ?.value, // Emergency Contact Name
        emergency_contact_phone: this.createDpiForm.get(
          'emergency_contact_phone'
        )?.value, // Emergency Contact Phone
        emergency_contact_relationship: this.createDpiForm.get(
          'emergency_contact_relationship'
        )?.value, // Emergency Contact Relationship
        gender: this.createDpiForm.get('gender')?.value, // Gender
        blood_type: this.createDpiForm.get('blood_type')?.value, // Blood Type
        mutuelle_name: this.createDpiForm.get('mutuelle_name')?.value, // Mutuelle Name
        mutuelle_policy_number: this.createDpiForm.get('mutuelle_policy_number')
          ?.value, // Mutuelle Policy Number
        medical_history: this.createDpiForm.get('medical_history')?.value, // Medical History
        hospital: this.createDpiForm.get('hospital')?.value, // Hospital Name
        doctor: this.createDpiForm.get('doctor')?.value, // Doctor ID (ensure only the ID is passed)
      };

      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Pass the `formData` instead of `this.createDpiForm.value`
      this.createDpiService.createDpi(formData).subscribe({
        next: (response) => {
          console.log('DPI created successfully', response);
          this.successMessage = 'DPI créé avec succès!';
          this.router.navigate(['/dpi-list']);
          setTimeout(() => {
            this.createDpiForm.reset();
            this.router.navigate(['/dpi-list']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error creating DPI', error);
          this.errorMessage =
            'Erreur lors de la création du DPI. Veuillez réessayer.';
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormGroupTouched(this.createDpiForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onReset(): void {
    this.createDpiForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}
