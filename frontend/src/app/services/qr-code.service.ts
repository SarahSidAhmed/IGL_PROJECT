// qr.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private http: HttpClient) { }
  generateQRCode(ssn: string): Promise<string> {
    return QRCode.toDataURL(ssn);
  }
}
