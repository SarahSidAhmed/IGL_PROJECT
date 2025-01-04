import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RechDoctorService } from '../../../../services/rech-doctor.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() socialSecurityNumber!: string;
  @Input() contactNumber!: string;
  @Input() email!: string;

  @Output() patientDeleted = new EventEmitter<number>();
  isModalOpen: boolean = false;

  constructor(
    private patientListService: RechDoctorService,
    private router: Router
  ) {console.log('Patient ID in Card:', this.patientId);}

  confirmAndDelete(): void {
    this.isModalOpen = true;
  }
  onConsult(patientId: string) {
    if (patientId) {
      this.router.navigate(['/dpi-doctor', patientId]);
    } else {
      console.error('Patient ID is undefined');
    }
  }
  
  closeModal(): void {
    this.isModalOpen = false;
  }

  onConfirmDeletion(): void {
    this.patientListService.deletePatient(Number(this.patientId)).subscribe({
      next: () => {
        alert('Patient deleted successfully.');
        this.patientDeleted.emit(Number(this.patientId));
        this.closeModal();
      },
      error: (error) => {
        console.error('Error deleting the patient:', error);
        alert('Failed to delete the patient. Please try again.');
        this.closeModal();
      },
    });
  }
  onEdit(): void {
    this.router.navigate(['/edit-dpi', this.patientId]);
  }
}
