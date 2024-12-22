import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-soin-card',
  imports: [],
  templateUrl: './soin-card.component.html',
  styleUrl: './soin-card.component.scss'
})
export class SoinCardComponent {
@Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() soinNeeded!: string;
}
