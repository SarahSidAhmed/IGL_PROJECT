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
  @Input() param1!: [boolean, string, number];
  @Input() param2!: [boolean, string, number];
  @Input() param3!: [boolean, string, number];
  @Input() param4!: [boolean, string, number];
  @Input() param5!: [boolean, string, number];
  @Input() param6!: [boolean, string, number];

  isPopupVisible: boolean = false;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
}
