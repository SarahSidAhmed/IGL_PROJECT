import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr-scan',
  imports: [ZXingScannerModule, CommonModule, HttpClientModule],
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})
export class QrScanComponent {
  allowedFormats = [
    BarcodeFormat.QR_CODE,
  ];

  selectedDevice: MediaDeviceInfo | undefined;
  devices: MediaDeviceInfo[] = [];

  @Output() searchDpi = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<void>();

  isScanning: boolean = false; 
  scannedCode: string = '1';

  ngOnInit() {
    this.checkCameraPermissions();
  }

  
  checkCameraPermissions() {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length === 0) {
          alert('No camera found.');
        }
      });
    }
  }

  onClose(): void {
    this.closePopup.emit();
  }

  // Starts the scanning process
  startScan() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          console.log('Camera access granted');
          this.isScanning = true;
        })
        .catch((err) => {
          console.error('Camera access error:', err);
          alert('Camera access is denied or unavailable. Please check your permissions and try again.');
        });
    } else {
      alert('Your browser does not support camera access.');
    }
  }

  // Handles successful scan
  onScanSuccess(result: string): void {
    this.scannedCode = result;
    this.isScanning = false;
  }

  // Reads QR code from an uploaded image
async ReadQr(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      if (reader.result) {
        const qrReader = new BrowserQRCodeReader();
        try {
          // Decode QR code from the image URL
          const result = await qrReader.decodeFromImageUrl(reader.result as string);
          this.scannedCode = result.getText(); 
          alert('QR Code scanned successfully: ' + this.scannedCode);
        } catch (error) {
          console.error('Error reading QR code from image:', error);
          alert('Failed to read QR code from the image. Please try anotther image.');
        }
      }
    };

    reader.readAsDataURL(file);
  }
}
  
  onSearchClick(): void {
    console.log('in search 00');
    // alert('First alert');
    // if (!this.scannedCode.trim()) {
    //   alert('No QR code scanned.');
    //   this.onClose();
    //   return;
    // }
    // alert('Here');
    this.searchDpi.emit(this.scannedCode); // Emit the scanned code
  }


}
