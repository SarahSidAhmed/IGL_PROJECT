import { Component, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@Component({
  selector: 'app-qr-scan',
  imports: [ZXingScannerModule],
  templateUrl: './qr-scan.component.html',
  styleUrl: './qr-scan.component.scss'
})
export class QrScanComponent {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  @Output() closePopup = new EventEmitter<void>();
  onClose(): void {
    this.closePopup.emit();
  }
}
