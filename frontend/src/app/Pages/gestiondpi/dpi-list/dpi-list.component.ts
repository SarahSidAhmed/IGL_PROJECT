import { Component, OnInit } from '@angular/core';
import { DpiCardComponent } from '../dpi-card/dpi-card.component';
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
  imports: [CommonModule, DpiCardComponent, FormsModule],
  templateUrl: './dpi-list.component.html',
  styleUrls: ['./dpi-list.component.scss'],
})
export class DpiListComponent implements OnInit {
  dpis: Dpi[] = [];
  searchInput = new Subject<string>();
  searchQuery: string = '';

  constructor(
    private router: Router, 
    private dpiListService: DpiListService
  ) {}

  ngOnInit(): void {
    // Initial load of all DPIs
    this.fetchDpis();

    // Setup search with debounce
    this.searchInput.pipe(
      debounceTime(300),
      switchMap(query => {
        // If query is empty, fetch all DPIs
        if (!query.trim()) {
          return this.dpiListService.searchDpis();
        }
        return this.dpiListService.searchDpis(query.trim());
      })
    ).subscribe({
      next: (response) => {
        this.dpis = response.results;
      },
      error: (error) => {
        console.error('Error fetching DPIs:', error);
        // Handle error appropriately
      }
    });
  }

  fetchDpis(): void {
    this.dpiListService.searchDpis('43').subscribe({
      next: (response) => {
        this.dpis = response.results;
      },
      error: (error) => {
        console.error('Error fetching DPIs:', error);
        // Handle error appropriately
      }
    });
  }

  // Updated method to handle search input changes
  onSearchChange(query: string): void {
    // Emit the search query even if it's empty
    this.searchInput.next(query);
  }

  // Clear search
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange('');
  }

  calculateAge(birthdate: string): number {
    // Make sure we have a valid date string
    if (!birthdate) return 0;

    const birth = new Date(birthdate);
    
    // Check if the date is valid
    if (isNaN(birth.getTime())) return 0;
    
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - birth.getFullYear();
    
    // Get month difference
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // If birthday hasn't occurred this year, subtract one year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    // Add logging to debug
    console.log('Birthdate:', birthdate);
    console.log('Calculated age:', age);
    
    return age;
  }


  scanQrCode() {
    throw new Error('Method not implemented.');
  }

  onCreateDpi(): void {
    this.router.navigate(['/create-dpi']);
  }

  onLogout(): void {
    console.log('Logging out...');
    // Add logout logic here
  }
}