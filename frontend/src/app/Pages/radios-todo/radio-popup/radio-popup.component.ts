import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RadioUpdateService } from '../../../services/update-radio.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'radio-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './radio-popup.component.html',
  styleUrls: ['./radio-popup.component.scss'],
  providers: [DatePipe],
})
export class RadioPopupComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() radioId!: number;
  @Input() radioNeeded!: string;

  @Output() closePopup = new EventEmitter<void>();

  selectedFileName: string | null = null;
  result: string = '';
  examDate: string = '';
  file: File | null = null;
  formData = new FormData();
  constructor(private radioUpdateService: RadioUpdateService, private datePipe: DatePipe) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.file = input.files[0];
      this.selectedFileName = this.file.name;
    }
  }

  onSubmit(): void {
    const formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.examDate = formattedDate || '';

    if (this.file) {
      this.formData.append('image', this.file); // Append the selected file
    }else{
      this.formData.append('image', '');
    }
    this.formData.append('exam_date', this.examDate);
    this.formData.append('radiologist', ''); // Add additional fields if required
    this.formData.append('result', this.result);

    console.log(this.formData);
    console.log('Submitting FormData:', {
    image: this.file,
    exam_date: this.examDate,
    radiologist: 7,
    result: this.result,
  });

    this.radioUpdateService.updateRadiologicalExam(this.radioId.toString(), this.formData).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.onClose();
      },
      error: (err) => {
        console.error('Error updating radiological exam:', err);
      },
    });
  }

  onClose(): void {
    this.closePopup.emit();
  }
}
