import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() patient: any;
  qrCodeUrl: string = ''; 

ngOnInit() {
  if (this.patient?.id) {
    const color = '#10217D'; // Hex color code
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      this.patient.id
    )}&size=110x110&color=${color.replace('#', '')}`; // Remove '#' and pass hex color code
  }
}

}
