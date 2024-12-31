import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'radio-popup',
  templateUrl: './radio-popup.component.html',
  styleUrls: ['./radio-popup.component.scss'],
})
export class RadioPopupComponent {
selectedFileName: any;
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() radioNeeded!: string;

  @Output() closePopup = new EventEmitter<void>();

  onClose(): void {
    this.closePopup.emit();
  }
}
