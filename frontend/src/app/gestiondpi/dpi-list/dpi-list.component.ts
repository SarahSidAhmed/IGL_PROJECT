import { Component } from '@angular/core';
import { DpiCardComponent } from '../dpi-card/dpi-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Patient {
  patientName: string;
  gender: string;
  age: number;
  patientId: string;
  socialSecurityNumber: string;
  contactNumber: string;
  email: string;
}

@Component({
  selector: 'app-dpi-list',
  templateUrl: './dpi-list.component.html',
  styleUrls: ['./dpi-list.component.scss'],
  imports: [DpiCardComponent, CommonModule, FormsModule],
})
export class DpiListComponent {
  constructor(private router: Router) {}  // Inject Router

  onCreateDpi() {
    this.router.navigate(['/create-dpi']); 
  }

scanQrCode() {
throw new Error('Method not implemented.');
}
  searchQuery: string = '';
  dpiList: Patient[] = [
    {
      patientName: 'John Doe',
      gender: 'Male',
      age: 30,
      patientId: '001',
      socialSecurityNumber: '123-45-6789',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      patientName: 'Kheddia Assia',
      gender: 'Male',
      age: 30,
      patientId: '001',
      socialSecurityNumber: '123-45-6789',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      patientName: 'Kadid Selssabil',
      gender: 'Male',
      age: 30,
      patientId: '001',
      socialSecurityNumber: '123-45-6789',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      patientName: 'Djouaher Yasmine',
      gender: 'Male',
      age: 30,
      patientId: '001',
      socialSecurityNumber: '123-45-6789',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
    },
    {
      patientName: 'Jane Smith',
      gender: 'Female',
      age: 25,
      patientId: '002',
      socialSecurityNumber: '987-65-4321',
      contactNumber: '987-654-3210',
      email: 'jane.smith@example.com',
    },
    // Add more dummy data here
  ];

  filteredDpiList: Patient[] = [...this.dpiList];

  onLogout() {
    console.log('Logging out...');
    // Add logout logic here
  }
  

  // Triggered on clicking the Search button
  onSearch() {
    this.filteredDpiList = this.dpiList.filter((card) =>
      card.patientName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  /*filterDpiCards() {
    const query = this.searchQuery.toLowerCase();
    this.filteredDpiList = this.dpiList.filter((patient) =>
      patient.patientName.toLowerCase().includes(query)
    );
  }*/
}
