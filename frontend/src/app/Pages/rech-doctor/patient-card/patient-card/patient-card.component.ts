import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-card',
  imports: [],
  templateUrl: './patient-card.component.html',
  styleUrl: './patient-card.component.scss',
})
export class PatientCardComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;

  @Input() socialSecurityNumber!: string;
  @Input() contactNumber!: string;
  @Input() email!: string;
}
