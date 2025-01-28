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
  param1: number | null;
  param2: number | null;
  param3: number | null;
  param4: number | null;
  param5: number | null;
  param6: number | null;
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
  @Input() testId!: number;
  @Input() testsNeeded!: string;
  @Input() param1!: [boolean, string, number];
  @Input() param2!: [boolean, string, number];
  @Input() param3!: [boolean, string, number];
  @Input() param4!: [boolean, string, number];
  @Input() param5!: [boolean, string, number];
  @Input() param6!: [boolean, string, number];

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
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    param5: 0,
    param6: 0,
  };

  showGraph: boolean = false;

  // Chart.js data and configuration
  chartData: ChartData<'bar'> = {
    labels: [
      this.param1[1],
      this.param2[1],
      this.param3[1],
      this.param4[1],
      this.param5[1],
      this.param6[1],
    ],
    datasets: [
      {
        label: 'Test Results',
        data: [
          this.results.param1,
          this.results.param2,
          this.results.param3,
          this.results.param4,
          this.results.param5,
          this.results.param6,
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
      this.results.param1 || 0,
      this.results.param2 || 0,
      this.results.param3 || 0,
      this.results.param4 || 0,
      this.results.param5 || 0,
      this.results.param6 || 0,
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
  // const id = parseInt(this.patientId); // Assuming patientId is the test record ID.
  const data = {
    result: this.report,
    exam_date: new Date().toISOString().split('T')[0], // Example date format.
    lab_technician: 7, 
    parameters: [
      // { id: 0, value: this.results.glucose || 0 },
      // { id: 2, value: this.results.crp || 0 },
      // { id: 3, value: this.results.creatinine || 0 },
      // { id: 4, value: this.results.cholesterol || 0 },
      // { id: 5, value: this.results.sodium || 0 },
      // { id: 6, value: this.results.potassium || 0 },
    ],
  };

  this.updateTestService.updateTest(this.testId, data).subscribe({
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
