import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TestPopupComponent } from '../test-popup/test-popup.component';

@Component({
  selector: 'app-test-card',
  imports: [CommonModule, TestPopupComponent],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.scss',
})
export class TestCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() testId!: number;
  @Input() testsNeeded!: string;
  isPopupVisible: boolean = false;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
