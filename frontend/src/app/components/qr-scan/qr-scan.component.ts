import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-scan',
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './qr-scan.component.html',
  styleUrl: './qr-scan.component.scss'
})
export class QrScanComponent {
  allowedFormats = [
    BarcodeFormat.QR_CODE,
  ];

    selectedDevice: MediaDeviceInfo | undefined; // Use undefined instead of null
  devices: MediaDeviceInfo[] = [];

  @Output() closePopup = new EventEmitter<void>();

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

  isScanning: boolean = false; // Controls the visibility of the scanner
  scannedCode: string = ''; // Stores the scanned QR code

  onClose(): void {
    this.closePopup.emit();
  }

  // Starts the scanning process
  startScan() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log('Camera is accessible');
        this.isScanning = true;
      })
      .catch((error) => {
        console.error('Camera permission denied or unavailable', error);
        alert('Camera access denied. Please enable camera permissions.');
      });
  } else {
    alert('Your browser does not support camera access.');
  }
}
  // Handles successful scan
  onScanSuccess(result: string): void {
    this.scannedCode = result;
    this.isScanning = false; // Stops the scanner after a successful scan
  }
}
