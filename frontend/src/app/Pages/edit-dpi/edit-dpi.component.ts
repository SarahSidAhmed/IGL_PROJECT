import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DpiListService } from '../../services/dpi-list.service';
import { EditDpiService } from '../../services/edit-dpi.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-edit-dpi',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './edit-dpi.component.html',
  styleUrl: './edit-dpi.component.scss',
})
export class EditDpiComponent implements OnInit {
  editDpiForm!: FormGroup;
  dpiId!: number;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  doctors: any[] = [];
  isLoadingDoctors = false;
  doctorLoadError = '';

  constructor(
    private fb: FormBuilder,
    private editDpiService: EditDpiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.dpiId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDpiData();
    this.loadDoctors();
  }
  private loadDoctors(): void {
    this.isLoadingDoctors = true;
    this.doctorLoadError = '';

    this.editDpiService.getDoctors().subscribe({
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
    this.editDpiForm = this.fb.group({
      social_security_number: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
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
          //Validators.minLength(10),
          //Validators.maxLength(20),
        ],
      ],
      emergency_contact_relationship: [
        '',
        [
          Validators.required,
          // Validators.minLength(1),
          //Validators.maxLength(30),
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
      password: ['', [Validators.required]],
     // confirm_password: ['', [Validators.required]],
    });
  }

  private loadDpiData(): void {
    this.isLoading = true;
    this.editDpiService.getDpiById(this.dpiId).subscribe({
      next: (dpi) => {
        // Format the date to YYYY-MM-DD for the input
        const formattedDate = new Date(dpi.birthdate)
          .toISOString()
          .split('T')[0];

        this.editDpiForm.patchValue({
          ...dpi,
          birthdate: formattedDate,
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading DPI:', error);
        this.errorMessage = 'Error loading patient data';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.editDpiForm.valid && !this.isLoading) {
      
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = {
        ...this.editDpiForm.value,
        birthdate: new Date(this.editDpiForm.get('birthdate')?.value)
          .toISOString()
          .split('T')[0],
      };

      this.editDpiService.updateDpi(this.dpiId, formData).subscribe({
        next: () => {
          this.successMessage = 'DPI updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/dpilist']);
          }, 2000);
          this.editDpiForm.get('password')?.disable();
         
          this.isLoading=false;
        },
        error: (error) => {
          console.error('Error updating DPI:', error);
          this.errorMessage = 'Error updating patient data. Please try again.';
          this.isLoading = false;
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dpilist']);
  }
}
