import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TestCardComponent } from '../test-card/test-card.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QrScanComponent } from '../../../components/qr-scan/qr-scan.component';
import { TestTodoListService } from '../../../services/test-todo-list.service';
import { Router } from '@angular/router';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

interface BiologicalExam {
  id: number;
  exam_name: string;
  dpi: {
    first_name: string;
    last_name: string;
    birthdate: string;
    gender: string;
  };
  consultation: number;
  parameters: Parameter[];
}

interface Parameter {
  id: number;
  param_name: string;
}
@Component({
  selector: 'app-test-list',
  imports: [CommonModule, TestCardComponent, FormsModule, NavbarComponent, QrScanComponent],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss',
})
export class TestListComponent implements OnInit {
  biologicalExams: BiologicalExam[] = [];
  searchInput = new Subject<string>();
  searchQuery: string = '';
  isQrCodeSearch: boolean = false;

  scanQrVisible: boolean = false;
  scanQrCode() {
    this.scanQrVisible = !this.scanQrVisible;
  }
  constructor(
    private router: Router,
    private biologicalExamService: TestTodoListService
  ) {
    this.fetchBioExams();
  }


  onLogout() {
    console.log('Logging out...');
    // Add logout logic here
  }

  ngOnInit(): void {
    this.fetchBioExams();
    this.searchInput
      .pipe(
        debounceTime(300),
        switchMap((query) => {
          if (!query.trim()) {
            return this.biologicalExamService.searchBiologicalExams();
          }
          return this.biologicalExamService.searchBiologicalExams(query.trim());
        })
      )
      .subscribe({
        next: (response) => {
          if (Array.isArray(response)) {
            this.biologicalExams = response.filter((dpi) => dpi); // For multiple DPIs
          } else if (response) {
            this.biologicalExams = [response]; // For single DPI
          } else {
            this.biologicalExams = [];
          }
        },
        error: (error) => {
          console.error('Error fetching biological exams:', error);
        },
      });
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
  fetchBioExams(): void {
    this.biologicalExamService.searchBiologicalExams('').subscribe({
      next: (response) => {
        this.biologicalExams = Array.isArray(response) ? response.filter(dpi => dpi) : [];
      },
      error: (error) => {
        console.error('Error fetching biological exams:', error);
      },
    });
  }

  onSearchChange(query: string): void {
    this.searchInput.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearchChange('');
  }
    searchTest(id: string): void {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      console.error('Invalid ID: must be a number');
      alert('ID invalide : Veuillez scanner un code QR valide contenant un ID numérique.');
      return;
    }
    console.log("looking for the soin with id :");
    console.log(id);

     this.biologicalExamService.searchTestQR(numericId).subscribe({
      next: (response) => {
        console.log('DPI Search Response:', response);
        this.biologicalExams = response.results;
        console.log('DPI Search Response.results:', response);
      },
      error: (error) => {
        console.error('Error searching DPIs:', error);
        alert('Il n\'y a pas de DPI avec cet ID');
      },
    });
  }

  getParam(parameters: Parameter[], i: number): [boolean, string, number] {
    if (!parameters || parameters.length === 0 || i < 0 || i >= parameters.length) {
      // Return default structure if the index is invalid or the array is empty
      return [false, '', 0];
    }

    const param = parameters[i];
    return [true, param.param_name, param.id];
  }
}
