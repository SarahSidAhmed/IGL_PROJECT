import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-soin-popup',
  imports: [CommonModule],
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

  onClose(): void {
    this.closePopup.emit();
  }
}
