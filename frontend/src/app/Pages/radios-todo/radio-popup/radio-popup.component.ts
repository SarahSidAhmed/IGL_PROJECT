import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioUpdateService } from '../../../services/update-radio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'radio-popup',
  imports : [FormsModule], 
  templateUrl: './radio-popup.component.html',
  styleUrls: ['./radio-popup.component.scss'],
})
export class RadioPopupComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() radioId!: number;
  @Input() radioNeeded!: string;
  
  @Output() closePopup = new EventEmitter<void>();
  
  selectedFileName: any;
  result: string = '';
  examDate: string = '';
  file: File | null = null;
  
  constructor(private radioUpdateService: RadioUpdateService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.file = input.files[0];
      this.selectedFileName = this.file.name;
    }
  }

  onSubmit(): void {
    this.examDate = new Date().toISOString(); // Format it as a string

    const examData = {
      image: null, 
      result: this.result,
      exam_date: this.examDate, 
      radiologist: null, 
    };

    console.log('Radiological Exam Data:', examData);
    this.radioUpdateService.updateRadiologicalExam(this.radioId.toString(), examData).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.onClose();
      },
      error: (err) => {
        console.error('Error updating radiological exam:', err);
      }
    });
  }

  onClose(): void {
    this.closePopup.emit();
  }
}
