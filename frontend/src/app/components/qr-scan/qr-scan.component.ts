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
  scannedCode: string = '5';

  ngOnInit() {
    this.checkCameraPermissions();
  }

  
  checkCameraPermissions() {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length === 0) {
          alert('Aucune caméra trouvée.');
        }
      });
    }
  }

  onClose(): void {
    this.closePopup.emit();
  }


  startScan() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          console.log('Accès à la caméra accordé');
          this.isScanning = true;
        })
        .catch((err) => {
          console.error('Erreur d\'accès à la caméra:', err);
          alert('L\'accès à la caméra est refusé ou indisponible. Veuillez vérifier vos autorisations et réessayer.');
        });
    } else {
      alert('Votre navigateur ne prend pas en charge l\'accès à la caméra.');
    }
  }


  onScanSuccess(result: string): void {
    this.scannedCode = result;
    this.isScanning = false;
  }

  async ReadQr(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.result) {
          const qrReader = new BrowserQRCodeReader();
          try {
            const result = await qrReader.decodeFromImageUrl(reader.result as string);
            this.scannedCode = result.getText(); 
          } catch (error) {
            console.error('Erreur lors de la lecture du code QR depuis l\'image:', error);
            alert("Échec de la lecture du code QR à partir de l'image. Veuillez essayer une autre image.");
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }
  
  onSearchClick(): void {
    if (!this.scannedCode.trim()) {
      alert('Pas de Code QR scanné');
      this.onClose();
      return;
    }
    this.searchDpi.emit(this.scannedCode);
    this.onClose();
  }
}
