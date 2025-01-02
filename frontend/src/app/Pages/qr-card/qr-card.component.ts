import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { QrCodeService } from '../../services/qr-code.service';

@Component({
  selector: 'app-qr-card',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss'
})
export class QrCardComponent implements OnInit{
  @ViewChild('qrImage', { static: false }) qrImage!: ElementRef;
  patientId: string = '';
  qrCodeData: string = '';
  constructor(
    private router: Router,
    private qrService: QrCodeService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { ssn: string, patientId: string };
    
    if (state) {
      this.patientId = state.patientId;
      // Generate QR code for the SSN
      this.generateQRCode(state.ssn);
    } else {
      // Redirect to home if no state
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Component initialization logic
  }

  async generateQRCode(ssn: string): Promise<void> {
    try {
      this.qrCodeData = await this.qrService.generateQRCode(ssn);
    } catch (error) {
      console.error('Error generating QR code:', error);
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
