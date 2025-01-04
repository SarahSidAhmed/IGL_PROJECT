import { Component, OnInit } from '@angular/core';
import { DpiCardComponent } from '../dpi-card/dpi-card.component';
import { QrScanComponent } from '../../../components/qr-scan/qr-scan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { DpiListService } from '../../../services/dpi-list.service';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

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
  imports: [CommonModule, DpiCardComponent, FormsModule, NavbarComponent, QrScanComponent],
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
  isQrCodeSearch: boolean = false;
  currentId: number = 0;

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
      return this.dpiListService.searchDpis(query.trim());
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
    this.dpiListService.searchDpis('').subscribe({
      next: (response) => {
        this.dpis = Array.isArray(response) ? response.filter(dpi => dpi) : [];
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
    console.log('Search query:', query);
    console.log('Before filtering:', this.dpis);
    if (!this.isQrCodeSearch){
    this.searchInput.next(query);}
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
  }

  searchDpi(id: string): void {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      console.error('Invalid ID: must be a number');
      alert('ID invalide : Veuillez scanner un code QR valide contenant un ID numérique.');
      return;
    }

    this.dpiListService.searchDpisQR(numericId).subscribe({
      next: (response) => {
        console.log('DPI Search Response:', response);
        this.dpis = [response];
        this.dpis.length = 1;
        console.log('DPI Search Response.results:', response);
      },
      error: (error) => {
        console.error('Error searching DPIs:', error);
        alert('Il n\'y a pas de DPI avec cet ID');
      },
    });
  }
}
