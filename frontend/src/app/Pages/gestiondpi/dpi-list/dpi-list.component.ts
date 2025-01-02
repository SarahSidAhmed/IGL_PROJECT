import { Component, OnInit } from '@angular/core';
import { DpiCardComponent } from '../dpi-card/dpi-card.component';
import { QrScanComponent } from '../../../components/qr-scan/qr-scan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { DpiListService } from '../../../services/dpi-list.service';
import { debounceTime, Subject, switchMap } from 'rxjs';

interface Dpi {
  id: number;
  password: string;
  doctorStaff: {
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
  selector: 'app-dpi-list',
  imports: [DpiCardComponent, CommonModule, FormsModule, QrScanComponent],
  templateUrl: './dpi-list.component.html',
  styleUrls: ['./dpi-list.component.scss'],
})
export class DpiListComponent implements OnInit {
  dpis: Dpi[] = [];
  searchInput = new Subject<string>();
  searchQuery: string = '';

  constructor(private router: Router, private dpiListService: DpiListService) {
    this.fetchDpis();
  }


scanQrVisible: boolean = false;
scanQrCode() {
  this.scanQrVisible = !this.scanQrVisible;
}

  ngOnInit(): void {
    this.fetchDpis();
    this.searchInput
      .pipe(
        debounceTime(300),
        switchMap((query) => {
          if (!query.trim()) {
            return this.dpiListService.searchDpis();
          }
          return this.dpiListService.searchDpis(query.trim());
        })
      )
      .subscribe({
        next: (response) => {
          this.dpis = response.results;
        },
        error: (error) => {
          console.error('Error fetching DPIs:', error);
        },
      });
  }

  fetchDpis(): void {
    this.dpiListService.searchDpis('').subscribe({
      next: (response) => {
        this.dpis = response.results;
      },
      error: (error) => {
        console.error('Error fetching DPIs:', error);
      },
    });
  }
  onDpiDeleted(deletedDpiId: number): void {
    this.dpis = this.dpis.filter(dpi => dpi.id !== deletedDpiId);
  }
  onSearchChange(query: string): void {
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


  onCreateDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  onLogout(): void {
    console.log('Logging out...');
    // Add logout logic here
  }
}
