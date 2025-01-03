import { Component, Input } from '@angular/core';
import { SoinPopupComponent } from '../soin-popup/soin-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soin-card',
  imports: [CommonModule, SoinPopupComponent],
  templateUrl: './soin-card.component.html',
  styleUrl: './soin-card.component.scss',
})
export class SoinCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() soinId!: number;
  @Input() soinNeeded!: string;
  isPopupVisible: boolean = false;
  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
