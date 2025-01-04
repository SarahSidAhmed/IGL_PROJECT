import { Component, OnInit } from '@angular/core';
import { RadioCardComponent } from '../radio-card/radio-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap } from 'rxjs';

import { RadioListService } from '../../../services/radio-list.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

interface RadiologicalExam {
  id: number;
  exam_name: string;
  dpi: {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
  };
  consultation: number;
}

@Component({
  selector: 'app-radio-list',
  imports: [RadioCardComponent, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './radio-list.component.html',
  styleUrl: './radio-list.component.scss',
})
export class RadioListComponent implements OnInit {
  radiologicalExams: RadiologicalExam[] = [];
  searchInput = new Subject<string>();
  searchQuery: string = '';
  isQrCodeSearch: boolean = false;
  constructor(
    private router: Router,
    private radiologicalExamService: RadioListService
  ) {
    this.fetchRadiologicalExams();
  }
  ngOnInit(): void {
    console.log('Component initialized');
    this.fetchRadiologicalExams();
    this.searchInput
      .pipe(
        debounceTime(300),
        switchMap((query) => {
          console.log('Search triggered with query:', query);
          if (!query.trim()) {
            return this.radiologicalExamService.searchRadiologicalExams();
          }
          return this.radiologicalExamService.searchRadiologicalExams(
            query.trim()
          );
        })
      )
      .subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.radiologicalExams = response.filter((dpi) => dpi); // For multiple DPIs
          } else if (response) {
            this.radiologicalExams = [response]; // For single DPI
          } else {
            this.radiologicalExams = [];
          }
        },
        error: (error) => {
          console.error('Search error:', error);
        },
      });
  }
  fetchRadiologicalExams(): void {
    console.log('Fetching radios');
    this.radiologicalExamService.searchRadiologicalExams('').subscribe({
      next: (response) => {
        this.radiologicalExams = Array.isArray(response) ? response.filter(dpi => dpi) : [];
      },
      error: (error) => {
        console.error('Fetch error:', error);
      },
    });
  }

  onSearchChange(query: string): void {
    console.log('Search input changed:', query);
    if (!this.isQrCodeSearch) {
      this.searchInput.next(query);
    }
  }
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange('');
  }
  scanQrCode() {
    throw new Error('Method not implemented.');
  }

  onLogout() {
    console.log('Logging out...');
    // Add logout logic here
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
}
