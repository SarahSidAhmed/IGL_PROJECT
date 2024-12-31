import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RadioPopupComponent } from "../radio-popup/radio-popup.component";

@Component({
  selector: 'app-radio-card',
  imports: [CommonModule, RadioPopupComponent],
  templateUrl: './radio-card.component.html',
  styleUrl: './radio-card.component.scss',
})
export class RadioCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() radioNeeded!: string;
  isPopupVisible: boolean = false;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
