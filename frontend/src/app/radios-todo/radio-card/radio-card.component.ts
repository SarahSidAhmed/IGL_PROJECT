import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-card',
  imports: [],
  templateUrl: './radio-card.component.html',
  styleUrl: './radio-card.component.scss',
})
export class RadioCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() radioNeeded!: string;
}
