import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dpi-card',
  imports: [],
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
}
