 import { CommonModule } from '@angular/common';
 import { UpdateTestService } from '../../../services/update-test.service';
 import { FormsModule } from '@angular/forms'; 
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

interface MedicalResults {
  glucose: number | null;
  crp: number | null;
  creatinine: number | null;
  cholesterol: number | null;
  sodium: number | null;
  potassium: number | null;
}


@Component({
  selector: 'app-test-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.scss'],
})
export class TestPopupComponent {
  @Input() patientName!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() patientId!: string;
  @Input() testsNeeded!: string;

  @Output() closePopup = new EventEmitter<void>();

  @Output() submitResults = new EventEmitter<{
    results: MedicalResults;
    report: string;
  }>();

  constructor(
  private cdr: ChangeDetectorRef,
  private updateTestService: UpdateTestService
) {}

  report: string = '';
  results: MedicalResults = {
    glucose: 0,
    crp: 0,
    creatinine: 0,
    cholesterol: 0,
    sodium: 0,
    potassium: 0,
  };

  showGraph: boolean = false;

  // Chart.js data and configuration
  chartData: ChartData<'bar'> = {
    labels: [
      'Glucose',
      'CRP',
      'Creatinine',
      'Cholesterol',
      'Sodium',
      'Potassium',
    ],
    datasets: [
      {
        label: 'Test Results',
        data: [
          this.results.glucose,
          this.results.crp,
          this.results.creatinine,
          this.results.cholesterol,
          this.results.sodium,
          this.results.potassium,
        ],
        backgroundColor: Array(6).fill('#0F766E'),
      },
    ],
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tests',
        },
      },
      y: {
        beginAtZero: true,
        
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;


  /**
   * Updates the `results` object when input values change.
   * @param field The field name being updated.
   * @param value The new value of the field.
   */
  onInputChange(field: keyof MedicalResults, event: Event): void {
    const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
    const value = target.value; // Access the value safely
    this.results[field] = value ? Number(value) : null; // Convert to number or assign null if empty
    console.log(this.results); // Debug: Log updated results
  }

  onGenerateGraph(): void {
    this.chartData.datasets[0].data = [
      this.results.glucose || 0,
      this.results.crp || 0,
      this.results.creatinine || 0,
      this.results.cholesterol || 0,
      this.results.sodium || 0,
      this.results.potassium || 0,
    ];
    this.showGraph = true;
    this.cdr.detectChanges();
    console.log(this.results);
  }

  closeGraph(): void {
    this.showGraph = false;
  }

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
  const id = parseInt(this.patientId); // Assuming patientId is the test record ID.
  const data = {
    result: this.report,
    exam_date: new Date().toISOString().split('T')[0], // Example date format.
    lab_technician: 123, // Replace with the actual technician ID if available.
    parameters: [
      { id: 1, value: this.results.glucose || 0 },
      { id: 2, value: this.results.crp || 0 },
      { id: 3, value: this.results.creatinine || 0 },
      { id: 4, value: this.results.cholesterol || 0 },
      { id: 5, value: this.results.sodium || 0 },
      { id: 6, value: this.results.potassium || 0 },
    ],
  };

  this.updateTestService.updateTest(id, data).subscribe({
    next: (response) => {
      console.log('Update successful', response);
      this.onClose();
    },
    error: (error) => {
      console.error('Update failed', error);
    },
  });
}


  onReset(): void {
    this.results = {
      glucose: null,
      crp: null,
      creatinine: null,
      cholesterol: null,
      sodium: null,
      potassium: null,
    };
    this.report = '';
    this.closePopup.emit();
  }

}
