import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { QrCodeService } from '../../services/qr-code.service';

@Component({
  selector: 'app-qr-card',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss',
})
export class QrCardComponent implements OnInit {
  @ViewChild('qrImage', { static: false }) qrImage!: ElementRef;
  patientId: string = '';
  qrCodeData: string = '';
  constructor(private router: Router, private qrService: QrCodeService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { patientId: string };

    if (state && state.patientId) {
      console.log('Patient ID received:', state.patientId);
      this.patientId = state.patientId;
      this.generateQRCode(state.patientId);
    } else {
      console.warn('Missing or invalid patient ID. Redirecting...');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  async generateQRCode(patientId: string): Promise<void> {
    try {
      if (!patientId) {
        throw new Error('Invalid patient ID');
      }
      this.qrCodeData = await this.qrService.generateQRCode(String(patientId));
      if (!this.qrCodeData.startsWith('data:image')) {
        this.qrCodeData = `data:image/png;base64,${this.qrCodeData}`;
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code. Please check the patient ID.');
    }
  }
  
  

  downloadQrCode(): void {
    if (this.qrCodeData) {
      const link = document.createElement('a');
      link.href = this.qrCodeData;
      link.download = `patient-qr-${this.patientId}.png`;
      link.click();
      link.remove();
    }
  }

  goBack(): void {
    this.router.navigate(['/dpi-list']);
  }
}
