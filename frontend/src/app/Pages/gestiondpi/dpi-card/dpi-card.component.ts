import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DpiListService } from '../../../services/dpi-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dpi-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './dpi-card.component.html',
  styleUrl: './dpi-card.component.scss'
})
export class DpiCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() socialSecurityNumber!: string;
  @Input() contactNumber!: string;
  @Input() email!: string;


  @Output() dpiDeleted = new EventEmitter<number>(); 
  isModalOpen: boolean = false;

  constructor(private dpiListService: DpiListService) {}
  confirmAndDelete(): void {
    this.isModalOpen = true;
  }

  // Close the modal without confirming
  closeModal(): void {
    this.isModalOpen = false;
  }
  /*confirmAndDelete(): void {
    const confirmed = confirm('Are you sure you want to delete this patient?');
    if (confirmed) {
      this.dpiListService.deleteDpi(Number(this.patientId)).subscribe({
        next: () => {
          alert('Patient deleted successfully.');
          this.dpiDeleted.emit(Number(this.patientId)); 
        },
        error: (error) => {
          console.error('Error deleting the patient:', error);
          alert('Failed to delete the patient. Please try again.');
        },
      });
    }
  }*/
    onConfirmDeletion(): void {
      this.dpiListService.deleteDpi(Number(this.patientId)).subscribe({
        next: () => {
          alert('Patient deleted successfully.');
          this.dpiDeleted.emit(Number(this.patientId)); // Notify parent component
          this.closeModal(); // Close the modal
        },
        error: (error) => {
          console.error('Error deleting the patient:', error);
          alert('Failed to delete the patient. Please try again.');
          this.closeModal(); // Close the modal
        },
      });
    }
}