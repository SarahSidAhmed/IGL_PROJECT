import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DpiListService } from '../../../services/dpi-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dpi-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './dpi-card.component.html',
  styleUrl: './dpi-card.component.scss',
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

  constructor(private dpiListService: DpiListService, private router: Router) {}
  confirmAndDelete(): void {
    this.isModalOpen = true;
  }
  onConsult(): void {
    this.router.navigate(['/dpi-doctor', this.patientId]);
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  onConfirmDeletion(): void {
    this.dpiListService.deleteDpi(Number(this.patientId)).subscribe({
      next: () => {
        alert('Patient deleted successfully.');
        this.dpiDeleted.emit(Number(this.patientId));
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
