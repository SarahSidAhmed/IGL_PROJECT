import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-qr-card',
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './qr-card.component.html',
  styleUrl: './qr-card.component.scss'
})
export class QrCardComponent {
  @ViewChild('qrImage', { static: false }) qrImage!: ElementRef;

  downloadQrCode(): void {
    // Retrieve the QR code image source
    const qrCodeUrl = this.qrImage.nativeElement.src;

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = qrCodeUrl;

    // Set the download attribute to specify the file name
    link.download = 'MyQRCode.png';

    // Trigger the download
    link.click();

    // Clean up the temporary element
    link.remove();
  }

}
