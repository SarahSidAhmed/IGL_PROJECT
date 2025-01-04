import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { debounceTime, Subject, switchMap } from 'rxjs';
import { PatientCardComponent } from '../patient-card/patient-card/patient-card.component';
import { RechDoctorService } from '../../../services/rech-doctor.service';

interface Dpi {
  id: number;
  password: string;
  doctor: {
    id: number;
    name: string;
  };
  social_security_number: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  email: string;
  address: string;
  phone: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  gender: string;
  blood_type: string;
  mutuelle_name: string;
  mutuelle_policy_number: string;
  medical_history: string | null;
  hospital: string;
  admission_date: string;
}
@Component({
  selector: 'app-rech-doctor',
  imports: [CommonModule, FormsModule, PatientCardComponent],
  templateUrl: './rech-doctor.component.html',
  styleUrl: './rech-doctor.component.scss',
})
export class RechDoctorComponent implements OnInit {
  dpis: Dpi[] = [];
  searchInput = new Subject<string>();
  searchQuery: string = '';
  doctorId: number | null = null;
  constructor(
    private route: ActivatedRoute,

    private router: Router,
    private patientListService: RechDoctorService
  ) {
    this.route.params.subscribe((params) => {
      this.doctorId = Number(params['id']);
      console.log('Doctor ID from route:', this.doctorId);
      this.fetchDpis();
    });
  }

  ngOnInit(): void {
    const doctorIdFromRoute = this.route.snapshot.paramMap.get('id');
    console.log(this.doctorId);
    this.doctorId = doctorIdFromRoute ? Number(doctorIdFromRoute) : null;

    if (this.doctorId === null || isNaN(this.doctorId)) {
      console.error('Doctor ID is invalid or missing.');
      return;
    }

    this.fetchDpis();

    this.searchInput
      .pipe(
        debounceTime(300),
        switchMap((query) => {
          if (!query.trim()) {
            return this.patientListService.searchDpis('', this.doctorId!);
          }
          return this.patientListService.searchDpis(
            query.trim(),
            this.doctorId!
          );
        })
      )
      .subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.dpis = response.filter((dpi) => dpi); // For multiple DPIs
          } else if (response) {
            this.dpis = [response]; // For single DPI
          } else {
            this.dpis = [];
          }
        },
        error: (error) => {
          console.error('Error fetching DPIs:', error);
        },
      });
  }

  fetchDpis(): void {
    if (this.doctorId === null) {
      console.error('Doctor ID is null.');
      return;
    }
    this.patientListService.searchDpis('', this.doctorId).subscribe({
      next: (response) => {
        this.dpis = Array.isArray(response) ? response.filter(dpi => dpi) : [];
      },
      error: (error) => {
        console.error('Error fetching DPIs:', error);
      },
    });
  }
  onPatientDeleted(deletedPatientId: number): void {
    this.dpis = this.dpis.filter(dpi => dpi.id !== deletedPatientId);
  }
  onSearchChange(query: string): void {
    console.log('Search query:', query);
    console.log('Before filtering:', this.dpis);
    this.searchInput.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange('');
  }

  calculateAge(birthdate: string): number {
    if (!birthdate) return 0;

    const birth = new Date(birthdate);

    if (isNaN(birth.getTime())) return 0;

    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

  
    return age;
  }

  scanQrCode() {
    throw new Error('Method not implemented.');
  }

  onCreateDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  onLogout(): void {
    this.router.navigate(['/']);
  }
}
