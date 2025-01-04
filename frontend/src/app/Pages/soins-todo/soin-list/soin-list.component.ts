import { Component, OnInit } from '@angular/core';
import { SoinCardComponent } from '../soin-card/soin-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrScanComponent } from '../../../components/qr-scan/qr-scan.component';
import { NgModule } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { SoinListService } from '../../../services/soin-list.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

interface NursingRecord {
  id: number;
  care_name: string;
  dpi: {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
  };
  consultation: number;
}
@Component({
  selector: 'app-soin-list',
  imports: [SoinCardComponent, CommonModule, FormsModule, NavbarComponent, QrScanComponent],
  templateUrl: './soin-list.component.html',
  styleUrl: './soin-list.component.scss',
})
export class SoinListComponent implements OnInit {
  nursingRecords: NursingRecord[] = [];
  searchInput = new Subject<string>();
  searchQuery: string = '';
  isQrCodeSearch: boolean = false;
  scanQrVisible: boolean = false;
  scanQrCode() {
    this.scanQrVisible = !this.scanQrVisible;
  }

  constructor(
    private router: Router,
    private nursingRecordService: SoinListService
  ) {
    this.fetchNursingRecords();
  }

  ngOnInit(): void {
    console.log('Component initialized');
    this.fetchNursingRecords();
    this.searchInput
      .pipe(
        debounceTime(300),
        switchMap((query) => {
          console.log('Search triggered with query:', query);
          if (!query.trim()) {
            return this.nursingRecordService.searchNursingRecords();
          }
          return this.nursingRecordService.searchNursingRecords(query.trim());
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Search response:', response);
          this.nursingRecords = response.results;
        },
        error: (error) => {
          console.error('Search error:', error);
        },
      });
  }

  fetchNursingRecords(): void {
    console.log('Fetching nursing records');
    this.nursingRecordService.searchNursingRecords('').subscribe({
      next: (response) => {
        console.log('Fetch response:', response);
        this.nursingRecords = response.results;
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
