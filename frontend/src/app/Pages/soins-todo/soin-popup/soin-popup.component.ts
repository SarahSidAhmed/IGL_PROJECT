import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SoinUpdateService, NursingRecordUpdate } from '../../../services/update-soin.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-soin-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './soin-popup.component.html',
  styleUrl: './soin-popup.component.scss',
})
export class SoinPopupComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() soinNeeded!: string;

  @Output() closePopup = new EventEmitter<void>();

  patientObservation: string = ''; // Bind this to the observation input field
  nurseId: number = 0; // Populate this with the logged-in nurse's ID or another value

  constructor(private soinUpdateService: SoinUpdateService) {}

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    const nursingRecord: NursingRecordUpdate = {
      patient_observation: this.patientObservation || null,
      record_date: new Date().toISOString(),
      nurse: null,
    };

    const patientId = parseInt(this.patientId, 10); // Convert patientId to a number

    this.soinUpdateService.updateNursingRecord(patientId, nursingRecord).subscribe({
      next: (response) => {
        console.log('Record updated successfully:', response);
        this.onClose(); // Close the popup on success
      },
      error: (err) => {
        console.error('Error updating record:', err);
      },
    });
  }
}
